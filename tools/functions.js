const path = require("path");

const render = (req, res, template, data = {}) => {
  const baseData = {
    path: req.path, 
    user: req.isAuthenticated() ? req.user : null 
  };
  
  const mergedData = Object.assign(baseData, data);
  const templatePath = path.resolve(`views/pages/${template}`);
  
  res.render(templatePath, mergedData); // We render the template.
};

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) return next(); 
  req.session.backURL = req.url;
  res.redirect("/login");
};


module.exports = { render, authenticate }