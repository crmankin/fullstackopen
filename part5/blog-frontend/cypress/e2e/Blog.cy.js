describe("Blog app", () => {
    beforeEach(() => {
        localStorage.removeItem("BlogUser");
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        cy.request("POST", "http://localhost:3003/api/users", {
            name: "Tester A",
            username: "testerA",
            password: "Test-PW1"
        });
    });

    it("Login form is shown", () => {
        cy.visit("http://localhost:3000");

        cy.get("#frmLogin")
            .get("#txtUsername");
        cy.get("#frmLogin")
            .get("#txtPassword");
        cy.get("#frmLogin")
            .get("#btnLogin")
            .should("be.visible");
    });

    describe("Login", () => {
        it("succeeds with correct credentials", () => {
            cy.visit("http://localhost:3000");

            cy.get("#frmLogin")
                .get("#txtUsername")
                .type("testerA");
            cy.get("#frmLogin")
                .get("#txtPassword")
                .type("Test-PW1");
            cy.get("#frmLogin")
                .get("#btnLogin")
                .click();
            cy.get("#frmLogin")
                .should("not.exist");
            cy.contains("Logged in as testerA");
        });

        it("fails with wrong credentials", () => {
            cy.visit("http://localhost:3000");

            cy.get("#frmLogin")
                .get("#txtUsername")
                .type("testerA");
            cy.get("#frmLogin")
                .get("#txtPassword")
                .type("Wrong");
            cy.get("#frmLogin")
                .get("#btnLogin")
                .click();
            cy.get("#frmLogin")
                .should("be.visible");
            cy.contains("Invalid username or password")
                .should("have.css", "color", "rgb(255, 0, 0)");
            cy.contains("Logged in as testerA")
                .should("not.exist");

        });
    });

    describe("When logged in", () => {
        beforeEach(() => {
            cy.request("POST", "http://localhost:3003/api/login", { username: "testerA", password: "Test-PW1" })
                .then(response => {
                    localStorage.setItem("BlogUser", JSON.stringify(response.body));
                    cy.visit("http://localhost:3000");
                });
        });

        const createBlog = () => {
            cy.contains("New Blog").click();
            cy.get("input[type=text][placeholder=Title]").type("Cypress Guarantees Perfection");
            cy.get("input[type=text][placeholder=Author]").type("Old Charlie");
            cy.get("input[type=text][placeholder=URL]").type("https://docs.cypress.io/");
            cy.contains("Create").click();
        };

        it("a blog can be created", () => {
            createBlog();
            cy.get("#blogList").contains("Cypress Guarantees Perfection");
            cy.contains("Create").should("not.be.visible");
        });

        it("a blog can be liked", () => {
            createBlog();
            cy.get("#blogList").contains("Cypress Guarantees Perfection").parent().as("blogDiv");
            cy.get("@blogDiv").contains("show").click();
            cy.get("@blogDiv").get(".blogLikes").contains("Likes: 0");
            cy.get("@blogDiv").contains("like").click();
            cy.get("@blogDiv").get(".blogLikes").contains("Likes: 1");
        });

        it("a blog can be deleted", () => {
            createBlog();
            cy.get("#blogList").contains("Cypress Guarantees Perfection").parent().as("blogDiv");
            cy.get("@blogDiv").contains("show").click();
            cy.get("@blogDiv").contains("remove").click();
            cy.contains("Removed \"Cypress Guarantees Perfection\"");
            cy.get("#blogList").contains("Cypress Guarantees Perfection").should("not.exist");
        });

        it.only("a blog cannot be deleted by another user", () => {
            createBlog();
            // switch user logged in
            cy.request("POST", "http://localhost:3003/api/users", {
                name: "Tester B",
                username: "testerB",
                password: "PW2-test"
            });
            cy.request("POST", "http://localhost:3003/api/login", { username: "testerB", password: "PW2-test" })
                .then(response => {
                    localStorage.setItem("BlogUser", JSON.stringify(response.body));
                });
            cy.visit("http://localhost:3000");
            cy.get("#blogList").contains("Cypress Guarantees Perfection").parent().as("blogDiv");
            cy.get("@blogDiv").contains("show").click();
            cy.get("@blogDiv").contains("remove").click();
            cy.contains("blog can only be deleted by the owner");
            cy.get("#blogList").contains("Cypress Guarantees Perfection");
        });
    });
});
