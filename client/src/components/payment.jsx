import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const payment = async (amount,receipt, subscription=false, planType, state, userId) => {
    const { data: { key } } = await axios.get(`${BASE_URL}/payment/razorpaykey`);

    const { data: { order_id } } = await axios.post(`${BASE_URL}/payment/createorder`,{
        amount,
        receipt
    });

    return new Promise((resolve, reject) => {
        var options = {
            "key": key,
            "order_id": order_id,
            "handler": async function (response) {
                try {
                    if(subscription){
                        const { data: { success } } = await axios.post(`${BASE_URL}/payment/verify-payment`, {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            subscription,
                            planType,
                            state,
                            userId
                        });
                        resolve(success);
                    }
                    if(!subscription){
                        const { data: { success } } = await axios.post(`${BASE_URL}/payment/verify-payment`, {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        resolve(success);
                    }
                } catch (error) {
                    reject(error);
                }
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    });
};

export default payment;