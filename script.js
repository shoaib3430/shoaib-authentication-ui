// =========================================
// AETHERA / SHOAIB LOGIN & REGISTER
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTS
    // =========================================

    const tabButtons = document.querySelectorAll(".tab-btn");
    const forms = document.querySelectorAll(".form");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const switchForm = document.querySelector(".switch-form");

    const passwordToggles =
        document.querySelectorAll(".password-toggle");


    // =========================================
    // LOGIN / REGISTER TABS
    // =========================================

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedTab = button.dataset.tab;

            // Remove active from buttons
            tabButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            // Add active to clicked button
            button.classList.add("active");


            // Show selected form
            forms.forEach(function (form) {

                if (form.dataset.form === selectedTab) {
                    form.classList.add("active");
                } else {
                    form.classList.remove("active");
                }

            });

        });

    });


    // =========================================
    // LOGIN / REGISTER SWITCH LINK
    // =========================================

    if (switchForm) {

        switchForm.addEventListener("click", function (e) {

            e.preventDefault();

            // Open Login tab
            tabButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            const loginButton =
                document.querySelector('[data-tab="login"]');

            if (loginButton) {
                loginButton.classList.add("active");
            }


            // Show Login form
            forms.forEach(function (form) {

                if (form.dataset.form === "login") {
                    form.classList.add("active");
                } else {
                    form.classList.remove("active");
                }

            });

        });

    }


    // =========================================
    // PASSWORD SHOW / HIDE
    // =========================================

    passwordToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function () {

            const wrapper = toggle.closest(".password-wrapper");

            if (!wrapper) return;

            const input = wrapper.querySelector("input");

            if (!input) return;


            if (input.type === "password") {

                input.type = "text";

                toggle.classList.add("showing");

            } else {

                input.type = "password";

                toggle.classList.remove("showing");

            }

        });

    });


    // =========================================
    // ERROR MESSAGE FUNCTION
    // =========================================

    function showError(id, message) {

        const errorElement = document.getElementById(id);

        if (errorElement) {
            errorElement.textContent = message;
        }

    }


    // =========================================
    // CLEAR ERROR FUNCTION
    // =========================================

    function clearErrors() {

        const errors =
            document.querySelectorAll(".error-message");

        errors.forEach(function (error) {
            error.textContent = "";
        });

    }


    // =========================================
    // REGISTER
    // =========================================

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {

            e.preventDefault();

            clearErrors();


            const fullName =
                registerForm.elements["fullName"].value.trim();

            const email =
                registerForm.elements["registerEmail"].value.trim();

            const password =
                registerForm.elements["registerPassword"].value;

            const confirmPassword =
                registerForm.elements["confirmPassword"].value;


            let valid = true;


            // Name validation
            if (fullName.length < 3) {

                showError(
                    "fullNameError",
                    "Please enter your full name."
                );

                valid = false;

            }


            // Email validation
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showError(
                    "registerEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }


            // Password validation
            if (password.length < 6) {

                showError(
                    "registerPasswordError",
                    "Password must be at least 6 characters."
                );

                valid = false;

            }


            // Confirm password
            if (password !== confirmPassword) {

                showError(
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            // =====================================
            // SAVE ACCOUNT
            // =====================================

            const user = {
                name: fullName,
                email: email,
                password: password
            };


            localStorage.setItem(
                "shoaibUser",
                JSON.stringify(user)
            );


            alert(
                "Account created successfully!\n\n" +
                "You can now login with your email and password."
            );


            // Clear register form
            registerForm.reset();


            // Open Login
            const loginTab =
                document.querySelector('[data-tab="login"]');

            if (loginTab) {
                loginTab.click();
            }

        });

    }


    // =========================================
    // LOGIN
    // =========================================

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            clearErrors();


            const email =
                loginForm.elements["loginEmail"].value.trim();

            const password =
                loginForm.elements["loginPassword"].value;


            let valid = true;


            // Email validation
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showError(
                    "loginEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }


            // Password validation
            if (password.length === 0) {

                showError(
                    "loginPasswordError",
                    "Please enter your password."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            // =====================================
            // CHECK SAVED ACCOUNT
            // =====================================

            const savedUser =
                localStorage.getItem("shoaibUser");


            if (!savedUser) {

                showError(
                    "loginEmailError",
                    "No account found. Please register first."
                );

                return;

            }


            const user =
                JSON.parse(savedUser);


            // Check email
            if (email !== user.email) {

                showError(
                    "loginEmailError",
                    "Email address is incorrect."
                );

                return;

            }


            // Check password
            if (password !== user.password) {

                showError(
                    "loginPasswordError",
                    "Password is incorrect."
                );

                return;

            }


            // =====================================
            // LOGIN SUCCESS
            // =====================================

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            alert(
                "Login successful!\n\nWelcome, " +
                user.name + "!"
            );


            // =====================================
            // DASHBOARD
            // =====================================
            //
            // Agar dashboard.html bana hua hai
            // to neeche wali line uncomment karein:
            //
            // window.location.href = "dashboard.html";
            //

        });

    }


    // =========================================
    // FORGOT PASSWORD
    // =========================================

    const forgotPassword =
        document.querySelector(".forgot-password");


    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (e) {

            e.preventDefault();

            const email =
                prompt("Enter your registered email address:");

            if (!email) {
                return;
            }


            const savedUser =
                localStorage.getItem("shoaibUser");


            if (!savedUser) {

                alert(
                    "No account is registered yet."
                );

                return;

            }


            const user =
                JSON.parse(savedUser);


            if (email.trim().toLowerCase() ===
                user.email.toLowerCase()) {

                alert(
                    "Password recovery would normally " +
                    "send an email here.\n\n" +
                    "For this demo, contact the website administrator."
                );

            } else {

                alert(
                    "This email is not registered."
                );

            }

        });

    }


    // =========================================
    // GOOGLE BUTTON
    // =========================================

    const googleLogin =
        document.getElementById("googleLogin");


    if (googleLogin) {

        googleLogin.addEventListener("click", function () {

            alert(
                "Google Login clicked.\n\n" +
                "Real Google account connection requires " +
                "Google OAuth configuration and a backend."
            );

        });

    }


    // =========================================
    // GITHUB BUTTON
    // =========================================

    const githubLogin =
        document.getElementById("githubLogin");


    if (githubLogin) {

        githubLogin.addEventListener("click", function () {

            alert(
                "GitHub Login clicked.\n\n" +
                "Real GitHub account connection requires " +
                "GitHub OAuth configuration and a backend."
            );

        });

    }


    // =========================================
    // FACEBOOK BUTTON
    // =========================================

    const facebookLogin =
        document.getElementById("facebookLogin");


    if (facebookLogin) {

        facebookLogin.addEventListener("click", function () {

            alert(
                "Facebook Login clicked.\n\n" +
                "Real Facebook account connection requires " +
                "Facebook OAuth configuration and a backend."
            );

        });

    }


    // =========================================
    // REMOVE ERROR WHEN USER TYPES
    // =========================================

    const inputs =
        document.querySelectorAll("input");


    inputs.forEach(function (input) {

        input.addEventListener("input", function () {

            const group =
                input.closest(".form-group");

            if (!group) return;

            const error =
                group.querySelector(".error-message");

            if (error) {
                error.textContent = "";
            }

        });

    });

});

// ===============================
// MOBILE SWIPE LOGIN / REGISTER
// ===============================

const formContainer = document.querySelector(".form-container");

let touchStartX = 0;
let touchEndX = 0;

formContainer.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
});

formContainer.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {

    const swipeDistance = touchEndX - touchStartX;

    // Right swipe → Login
    if (swipeDistance > 80) {
        switchTab("login");
    }

    // Left swipe → Register
    if (swipeDistance < -80) {
        switchTab("register");
    }
}


// ===============================
// SWITCH LOGIN / REGISTER
// ===============================

function switchTab(tabName) {

    const tabs = document.querySelectorAll(".tab-btn");
    const forms = document.querySelectorAll(".form");

    tabs.forEach(tab => {
        tab.classList.remove("active");

        if (tab.dataset.tab === tabName) {
            tab.classList.add("active");
        }
    });

    forms.forEach(form => {
        form.classList.remove("active");

        if (form.dataset.form === tabName) {
            form.classList.add("active");
        }
    });
}