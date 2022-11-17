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

        const createBlog2 = () => {
            cy.contains("New Blog").click();
            cy.get("input[type=text][placeholder=Title]").type("Test Every Angle");
            cy.get("input[type=text][placeholder=Author]").type("Young Buck");
            cy.get("input[type=text][placeholder=URL]").type("https://facebook.com/");
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

        it("a blog cannot be deleted by another user", () => {
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

        it("blogs are ordered by number of likes", () => {
            createBlog();
            createBlog2();

            // three likes on the first blog
            cy.get("#blogList").contains("Cypress Guarantees Perfection").parent().as("blog1Div");
            cy.get("@blog1Div").contains("show").click();
            cy.get("@blog1Div").contains("like").click().click().click();
            cy.get("@blog1Div").get(".blogLikes").contains("Likes: 3");

            // two likes on the second blog
            cy.get("#blogList").contains("Test Every Angle").parent().as("blog2Div");
            cy.get("@blog2Div").contains("show").click();
            cy.get("@blog2Div").contains("like").click().click();
            cy.get("@blog2Div").get(".blogLikes").contains("Likes: 2");

            // the first blog should be at the top right now
            cy.get("#blogList .blogItem").eq(0).should("contain", "Cypress Guarantees Perfection");

            // add two more likes to the second blog, which will move it to the top
            cy.get("@blog2Div").contains("like").click().click();
            cy.get("@blog2Div").get(".blogLikes").contains("Likes: 4");

            // the second blog should be at the top now
            cy.get("#blogList .blogItem").eq(0).should("contain", "Test Every Angle");
        });
    });
});
