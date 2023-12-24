describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("backend")}/testing/reset`);
    const user1 = {
      name: "John Doe",
      username: "johnD",
      password: "horsemeat",
    };
    const user2 = {
      name: "Jane Doe",
      username: "janeD",
      password: "horsemeat",
    };
    cy.request("POST", `${Cypress.env("backend")}/users`, user1);
    cy.request("POST", `${Cypress.env("backend")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("johnD");
      cy.get("#password").type("horsemeat");
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("JohnD");
      cy.get("#password").type("dogmeat");
      cy.get("#login-button").click();

      cy.contains("invalid username or password");
    });
  });

  describe("When logged in", function () {
    const newBlogContent = {
      title: "Express is awesome!",
      author: "Jimmy Doolittle",
      url: "http://www.fakeblogsite.com",
    };

    beforeEach(function () {
      cy.logout();
      cy.login({ username: "johnD", password: "horsemeat" });
      cy.contains("logged in");
      cy.addBlog({
        title: "Express is awesome!",
        author: "Jimmy Doolittle",
        url: "http://www.fakeblogsite.com/post1",
        likes: 100,
      });
      cy.addBlog({
        title: "Javascript 101",
        author: "Ronald Reagan",
        url: "http://www.fakeblogsite.com/post3",
        likes: 0,
      });
      cy.addBlog({
        title: "React is awesome!",
        author: "John Hancock",
        url: "http://www.fakeblogsite.com/post2",
        likes: 50,
      });
      cy.visit("");
    });

    it("new blog can be created", function () {
      cy.contains("Express is awesome!");
    });

    it("blog can be liked", function () {
      cy.contains("Express is awesome!").contains("view").click();
      cy.contains("Express is awesome!").contains("like 0");
      cy.contains("Express is awesome!").contains("like").click();
      cy.contains("Express is awesome!").contains("like 1");
    });

    it("blog can be deleted", function () {
      cy.contains("Express is awesome!").invoke("attr", "id").as("idValue");
      cy.get("@idValue").then((idValue) => {
        cy.log(idValue);
        cy.deleteBlog(idValue);
      });
      cy.get("html").should("not.contain", "Express is awesome!");
    });

    it("show blogs delete button if user same", function () {
      cy.contains("Express is awesome!").contains("view").click();
      cy.contains("Express is awesome!").contains("Remove");
    });

    it("do not show blogs delete button if user is not same", function () {
      cy.logout();
      cy.login({ username: "janeD", password: "horsemeat" });
      cy.contains("Express is awesome!").contains("view").click();
      cy.contains("Express is awesome!").should("not.contain", "Remove");
    });

    it("blogs are sorted by likes in descending order", function () {
      cy.get(".blog").eq(0).should("contain", "Express is awesome!");
      cy.get(".blog").eq(1).should("contain", "React is awesome!");
      cy.get(".blog").eq(2).should("contain", "Javascript 101");
    });
  });
});
