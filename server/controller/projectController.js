const Project = require('../models/ProjectModel');

// Submit form
async function submitForm(req, res) {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to submit form' });
  }
}

// Get all projects
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
}

// Get project by ID
async function getProjectById(req, res) {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project' });
  }
}

async function updateProjectById(req, res) {

  const formId = req.params.id;
  const updatedForm = req.body;
  try {
    const result = await Project.findByIdAndUpdate(formId, updatedForm, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const deleteProjectById = async (req, res) => {
  const formId = req.params.id;
  try {
    console.log(formId);
    const deletedForm = await RegistrationForm.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Search projects by sector, country, or both
async function searchProjects(req, res) {
  const { sector, country } = req.body;
  const userSubscription = req.userSubscription;

  const query = {};

  if (sector) {
    query.sector = sector;
  }

  if (userSubscription.status != "active") {
    return res.status(401).json({
      success: false,
      message: "Buy Subscription."
    });
  }

  if (userSubscription.type === "One State Plan") {
    const state = userSubscription.state;
    query.state = state;
  } else if (userSubscription.type === "All India") {
    if (country) {
      query.country = country;
    } else {
      query.country = "India";
    }
  } else if (userSubscription.type === "Global") {
    if (country) {
      query.country = country;
    }
  }
console.log(query)
  try {
    const projects = await Project.find(query);
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to search projects" });
  }
}


module.exports = {
  submitForm,
  getAllProjects,
  getProjectById,
  searchProjects, deleteProjectById, updateProjectById
};
