// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("backend")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("user", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("logout", () => {
  localStorage.removeItem("user");
});

Cypress.Commands.add("getAllBlogs", (newBlog) => {
  cy.request({
    url: `${Cypress.env("backend")}/blogs`,
    method: "GET",
  });

  cy.visit("");
});

Cypress.Commands.add("addBlog", (newBlog) => {
  cy.request({
    url: `${Cypress.env("backend")}/blogs`,
    method: "POST",
    body: { title: newBlog.title, author: newBlog.author, url: newBlog.url },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });

  cy.visit("");
});

Cypress.Commands.add("deleteBlog", (id) => {
  cy.request({
    url: `${Cypress.env("backend")}/blogs/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  });

  cy.visit("");
});
