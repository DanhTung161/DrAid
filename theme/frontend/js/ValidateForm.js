"use strict";
window["VALIDATE"] =
    window["Validate"] =
    window["validate"] =
    window["formValidate"] =
    window["validateForm"] =
    window["VALIDATE_FORM"] =
    ((options = {}) => {
        let _colorMain = "#f99f1b";
        let _backgroundMain = "#000000";
        let _color = _colorMain;
        let _colorBorder = _colorMain;
        let _colorBackground = _backgroundMain;
        let _borderRadius = "4px";
        let _timeLoad = 0;
        let FORM_CLASS = ".form-validate";
        var validatorRules = {
            // Kiá»ƒm tra báº¯t buá»™c nháº­p
            required: function (selector) {
                if (selector.type == "file") {
                    return selector.files.length > 0
                        ? undefined
                        : selector.getAttribute("m-required") ||
                        "Vui lĂ²ng chá»n áº£nh";
                } else {
                    return selector.value.trim()
                        ? undefined
                        : selector.getAttribute("m-required") ||
                        "Vui lĂ²ng nháº­p thĂ´ng tin";
                }
            },
            // Kiá»ƒm tra cĂ³ pháº£i lĂ  sá»‘
            number: function (selector) {
                var regex = /^[0-9]+$/;
                if (selector.value.trim() == "") {
                    return undefined;
                }
                return regex.test(selector.value)
                    ? undefined
                    : selector.getAttribute("m-number") ||
                    "Vui lĂ²ng nháº­p Ä‘Ăºng Ä‘á»‹nh dáº¡ng sá»‘";
            },
            //Kiá»ƒm tra cĂ³ pháº£i email
            email: function (selector) {
                if (selector.value.trim() == "") {
                    return undefined;
                }
                var regex =
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(selector.value)
                    ? undefined
                    : selector.getAttribute("m-email") ||
                    "Vui lĂ²ng nháº­p Ä‘Ăºng Ä‘á»‹nh dáº¡ng email";
            },
            // Äá»™ dĂ i Ă­t nháº¥t
            minLength: function (min) {
                return function (selector) {
                    if (selector.value.trim() == "") {
                        return undefined;
                    }
                    return selector.value.length >= min
                        ? undefined
                        : selector.getAttribute("m-minLength") ||
                        `Vui lĂ²ng nháº­p Ă­t nháº¥t ${min} kĂ­ tá»±`;
                };
            },
            // Äá»™ dĂ i nhiá»u nháº¥t
            maxLength: function (max) {
                return function (selector) {
                    if (selector.value.trim() == "") {
                        return undefined;
                    }
                    return selector.value.length <= max
                        ? undefined
                        : selector.getAttribute("m-maxLength") ||
                        `Vui lĂ²ng nháº­p tá»‘i Ä‘a ${max} kĂ­ tá»±`;
                };
            },
            // Sá»‘ lá»›n hÆ¡n
            min: function (min) {
                return function (selector) {
                    if (selector.value.trim() == "") {
                        return undefined;
                    }
                    return Number(selector.value) >= min
                        ? undefined
                        : selector.getAttribute("m-min") ||
                        `Vui lĂ²ng nháº­p sá»‘ lá»›n hÆ¡n hoáº·c báº±ng ${min}`;
                };
            },
            // Äá»™ dĂ i cá»§a file
            fileLength: (length) => {
                return function (selector) {
                    return Number(selector.files.length) == length
                        ? undefined
                        : selector.getAttribute("m-max") ||
                        `Vui lĂ²ng chá»n ${length} áº£nh `;
                };
            },
            //Chá»©ng minh nhĂ¢n dĂ¢n
            cccd: (selector) => {
                if (selector.value.trim() == "") {
                    return undefined;
                }
                var check =
                    selector.value.length == 9 ||
                    selector.value.length == 12;
                return check
                    ? undefined
                    : selector.getAttribute("m-cccd") ||
                    `Sá»‘ CMND/CCCD khĂ´ng chĂ­nh xĂ¡c`;
            },
            max: function (max) {
                return function (selector) {
                    if (selector.value.trim() == "") {
                        return undefined;
                    }
                    return Number(selector.value) <= max
                        ? undefined
                        : selector.getAttribute("m-max") ||
                        `Vui lĂ²ng nháº­p sá»‘ bĂ© hÆ¡n hoáº·c báº±ng ${max} `;
                };
            },
            same: function (nameSelector, formElement) {
                return function (selector) {
                    if (selector.value.trim() == "") {
                        return undefined;
                    }
                    var selectorElement = formElement.querySelector(
                        `[name="${nameSelector}"]`
                    ).value;
                    return selector.value === selectorElement
                        ? undefined
                        : selector.getAttribute("m-same") ||
                        "Máº­t kháº©u khĂ´ng giá»‘ng nhau";
                };
            },
            different: function (nameSelector, formElement) {
                return function (selector) {
                    var selectorElement = formElement.querySelector(
                        `[name="${nameSelector}"]`
                    ).value;
                    return selector.value !== selectorElement
                        ? undefined
                        : selector.getAttribute("m-different") ||
                        "Máº­t kháº©u khĂ´ng Ä‘Æ°á»£c giá»‘ng nhau";
                };
            },
            phoneOrEmail: function (selector) {
                let isPhone = /^((\+)\d{2}|0)[1-9](\d{2}){4}$/;
                var value = selector.value.trim();
                if (isPhone.test(value)) {
                    var valueSelector = value.length >= 10;
                } else {
                    var isEmail =
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var valueSelector = isEmail.test(value);
                }
                return valueSelector
                    ? undefined
                    : selector.getAttribute("m-phoneOrEmail") ||
                    "KhĂ´ng Ä‘Ăºng Ä‘á»‹nh dáº¡ng email hoáº·c sá»‘ Ä‘iá»‡n thoáº¡i";
            },
            string: function (selector) {
                var isString =
                    /^[a-zA-ZĂ€ĂĂ‚ĂƒĂˆĂ‰ĂĂŒĂĂ’Ă“Ă”Ă•Ă™ĂÄ‚ÄÄ¨Å¨Æ Ă Ă¡Ă¢Ă£Ă¨Ă©ĂªĂ¬Ă­Ă²Ă³Ă´ĂµĂ¹ĂºÄƒÄ‘Ä©Å©Æ¡Æ¯Ä‚áº áº¢áº¤áº¦áº¨áºªáº¬áº®áº°áº²áº´áº¶áº¸áººáº¼á»€á»€á»‚áº¾Æ°Äƒáº¡áº£áº¥áº§áº©áº«áº­áº¯áº±áº³áºµáº·áº¹áº»áº½á»á»á»ƒáº¿á»„á»†á»ˆá»á»Œá»á»á»’á»”á»–á»˜á»á»œá»á» á»¢á»¤á»¦á»¨á»ªá»…á»‡á»‰á»‹á»á»á»‘á»“á»•á»—á»™á»›á»á»Ÿá»¡á»£á»¥á»§á»©á»«á»¬á»®á»°á»²á»´Ăá»¶á»¸á»­á»¯á»±á»³á»µá»·á»¹\s\W|_]+$/;
                const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/\`;`;
                const isSpecialCharsPresent = specialChars
                    .split("")
                    .some((char) => selector.value.trim().includes(char));
                return isString.test(selector.value.trim()) &&
                    !isSpecialCharsPresent
                    ? undefined
                    : selector.getAttribute("m-string") ||
                    "KhĂ´ng Ä‘Ăºng Ä‘á»‹nh dáº¡ng chá»¯ viáº¿t";
            },
            username: function (selector) {
                var isUsername = /^([a-z0-9]|[-._](?![-._])){4,30}$/;
                return isUsername.test(selector.value.trim())
                    ? undefined
                    : selector.getAttribute("m-string") ||
                    "KhĂ´ng Ä‘Ăºng Ä‘á»‹nh dáº¡ng tĂªn tĂ i khoáº£n";
            },
            phone: function (selector) {
                let isPhone = /^((\+)\d{2}|0)[1-9](\d{2}){4}$/;
                var check =
                    checkNotRequired(selector) ||
                    isPhone.test(selector.value);
                return check
                    ? undefined
                    : selector.getAttribute("m-phone") ||
                    "Vui lĂ²ng nháº­p Ä‘Ăºng Ä‘á»‹nh dáº¡ng sá»‘ Ä‘iá»‡n thoáº¡i";
            },
            regex: function (regex) {
                return function (selector) {
                    return RegExp(regex).test(selector.value)
                        ? undefined
                        : selector.getAttribute("m-regex") ||
                        `KhĂ´ng Ä‘Ăºng Ä‘á»‹nh dáº¡ng quy Ä‘á»‹nh`;
                };
            },
        };
        options.rules = {};
        function checkNotRequired(selector) {
            return (
                selector.getAttribute("rules").indexOf("required") == -1 &&
                selector.value.trim().length == 0
            );
        }
        function isRequired(selector) {
            return {
                selector: selector,
                check: function (value, selector) {
                    let message = selector.getAttribute("m-required")
                        ? selector.getAttribute("m-required")
                        : "Vui lĂ²ng nháº­p trÆ°á»ng nĂ y";
                    return value ? undefined : message;
                },
            };
        }
        function setStype() {
            var cssAnimation = document.createElement("style");
            cssAnimation.className = "form-validate-style";
            cssAnimation.type = "text/css";
            var keyframes = document.createTextNode(
                `@-webkit-keyframes openErrorMessage {from { opacity:0; transform: translateY(15px) } to{opacity:1; transform: translateY(5px)} }
            .r-error-message[type="absolute"]::before{
                content: '';
                border-width: 3px 5px;
                position: absolute;
                border-color: transparent transparent ${_colorBackground} transparent;
                border-style: solid;
                left: 25%;
                bottom: 100%;
                transform: translateX(-50%);
            }`
            );
            cssAnimation.appendChild(keyframes);
            if (
                !document
                    .getElementsByTagName("head")[0]
                    .querySelector(".form-validate-style")
            ) {
                document
                    .getElementsByTagName("head")[0]
                    .appendChild(cssAnimation);
            }
        }
        function setConfig(options) {
            _color = options.color || _colorMain;
            _colorBorder = options.colorBorder || _colorMain;
            _colorComment = options.colorComment || _colorMain;
            _colorBackground = options.colorBackground || _backgroundMain;
            _borderRadius = options.borderRadius || "";
            _timeLoad = options.timeLoad || 0;
        }
        function getParent(element, selector) {
            while (element.parentElement) {
                if (element.parentElement.matches(selector)) {
                    return element.parentElement;
                }
                element = element.parentElement;
            }
        }
        function callFunction(func, options = []) {
            try {
                var arrayFunc = func.split(".");
                if (
                    arrayFunc.length === 1 &&
                    null != window[arrayFunc[0]] &&
                    typeof window[arrayFunc[0]] === "function"
                ) {
                    return (
                        null != window[arrayFunc[0]] &&
                        typeof window[arrayFunc[0]] === "function" &&
                        window[arrayFunc[0]](...options)
                    );
                } else if (arrayFunc.length === 2) {
                    var obj = arrayFunc[0];
                    func = arrayFunc[1];
                    const classEval =
                        typeof eval(`${obj}`) === "object"
                            ? eval(`${obj}`)
                            : eval(`new ${obj}()`);
                    if (
                        typeof classEval === "object" &&
                        typeof classEval[func] === "function"
                    ) {
                        return (
                            typeof classEval[func] === "function" &&
                            classEval[func](...options)
                        );
                    } else if (
                        window[obj] === "object" &&
                        typeof window[obj][func] === "function"
                    ) {
                        return (
                            window[obj] === "object" &&
                            typeof window[obj][func] === "function" &&
                            window[obj][func](...options)
                        );
                    }
                }
            } catch (err) {
                console.log(err);
                alert(
                    "Sá»­a láº¡i data-success, ChÆ°a Ä‘Ăºng Ä‘á»‹nh dáº¡ng Object Function hoáº·c Class Function"
                );
            }
        }
        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(
                newNode,
                referenceNode.nextSibling
            );
        }
        function appendError(referenceNode, newNode) {
            referenceNode.appendChild(newNode);
        }
        function isJson(item) {
            item = typeof item !== "string" ? JSON.stringify(item) : item;
            try {
                item = JSON.parse(item);
            } catch (e) {
                return false;
            }
            if (typeof item === "object" && item !== null) {
                return true;
            }
            return false;
        }
        async function init(formLive = null) {
            let isPassLiveForm = true;
            const formElements = await (formLive !== null
                ? [formLive]
                : document.querySelectorAll(FORM_CLASS));
            Array.from(formElements).forEach(
                (formElement, indexFormMain) => {
                    options.rules[indexFormMain] = [];
                    var selectorRules = [];
                    var errorSelector = [];
                    var gallery = formElement.hasAttribute("gallery")
                        ? true
                        : false;
                    var nameInputFile;
                    var isAbsolute = formElement.hasAttribute("absolute")
                        ? true
                        : false;
                    var isClear = formElement.hasAttribute("clear")
                        ? true
                        : false;
                    var hasFuncPlus = formElement.hasAttribute("plus")
                        ? formElement.getAttribute("plus")
                        : null;
                    var hasFuncBefore = formElement.hasAttribute("before")
                        ? formElement.getAttribute("before")
                        : null;
                    var checkOne = formElement.hasAttribute("check-one")
                        ? true
                        : false;
                    if (gallery) {
                        // const listImage =
                        //     formElement.querySelectorAll(
                        //         "[label-attachment]"
                        //     );
                        // listImage.forEach((element) => {
                        //     new UploadFile(
                        //         {
                        //             element: element,
                        //             attribute: "gallery-of",
                        //         },
                        //         element.hasAttribute("has-file")
                        //     );
                        // });
                    }
                    function validateRadioCheckBox(rule, isSubmit) {
                        var rulesCheckbox = selectorRules[rule.selector];
                        var selector = formElement.querySelector(
                            rule.selector
                        );
                        var errorMessage;
                        var parentElement = false;
                        if (formElement.hasAttribute("parent")) {
                            parentElement = getParent(
                                selector,
                                formElement.getAttribute("parent")
                            );
                        }
                        for (var i in rulesCheckbox) {
                            switch (selector.type) {
                                case "radio":
                                case "checkbox":
                                    errorMessage = rulesCheckbox[i](
                                        formElement.querySelector(
                                            rule.selector + ":checked"
                                        ),
                                        parentElement
                                            ? parentElement
                                            : selector
                                    );
                                    break;
                                default:
                                    errorMessage = rules[i](selector.value);
                            }
                            if (errorMessage) break;
                        }
                        if (errorMessage) {
                            if (parentElement) {
                                actionHasParentElement(
                                    parentElement,
                                    errorMessage,
                                    selector,
                                    isSubmit
                                );
                            } else {
                                actionNoParentElement(
                                    errorMessage,
                                    selector,
                                    isSubmit
                                );
                            }
                        } else {
                            handleClearError({ target: selector });
                        }
                        return !errorMessage;
                    }
                    function configErrorElement(errorElement) {
                        errorElement.className = "r-error-message";
                        Object.assign(errorElement.style, {
                            pointerEvents: "none",
                            color: _color,
                            display: "block",
                            fontSize: "13.5px",
                            paddingBottom: "8px",
                            textAlign: "left",
                            zIndex: 2,
                            animation:
                                "0.3s openErrorMessage ease-in-out forwards",
                        });
                    }
                    function actionHasParentElement(
                        parentElement,
                        errorMessage,
                        selector,
                        isSubmit = true
                    ) {
                        const errorElement = createErrorElement(selector);
                        if (errorMessage) {
                            if (isSubmit) {
                                errorSelector.push(selector);
                                errorSelector[0].focus();
                            }
                            errorElement.innerHTML = errorMessage;
                            switch (selector.type) {
                                case "checkbox":
                                case "radio":
                                    const domErrorElement =
                                        parentElement.nextElementSibling;
                                    if (
                                        domErrorElement === null ||
                                        domErrorElement.className !==
                                        "r-error-message"
                                    ) {
                                        insertAfter(
                                            parentElement,
                                            errorElement
                                        );
                                    }
                                    break;
                                default:
                                    if (
                                        !parentElement.querySelector(
                                            ".r-error-message"
                                        )
                                    ) {
                                        appendError(
                                            parentElement,
                                            errorElement
                                        );
                                        if (
                                            parentElement.hasAttribute(
                                                "no-border"
                                            )
                                        )
                                            return;
                                        // parentElement.style.border = "1px solid " + _colorBorder;
                                    }
                                    break;
                            }
                        }
                    }
                    function createErrorElement(selector) {
                        var errorElement = document.createElement("span");
                        errorElement.dataset.inputName = selector.name;
                        configErrorElement(errorElement);
                        if (
                            isAbsolute &&
                            !selector.hasAttribute("no-absolute")
                        ) {
                            styleElementErrorAbsolute(
                                selector,
                                errorElement
                            );
                        }
                        return errorElement;
                    }
                    function styleElementErrorAbsolute(selector, error) {
                        error.setAttribute("type", "absolute");
                        Object.assign(error.style, {
                            position: "absolute",
                            padding: "5px 10px",
                            borderRadius: _borderRadius,
                            background: _colorBackground,
                            maxWidth: "80%",
                            fontWeight: "bold",
                            wordBreak: "break-word",
                            right: "auto",
                            top: "105%",
                        });
                        const parentSelector = selector.parentElement;
                        const style = getComputedStyle(parentSelector);
                        const checkPosition = style.position;
                        if (
                            selector.type ==
                            ("select-one" || "select-multiple") &&
                            checkPosition == "relative"
                        ) {
                            Object.assign(error.style, {
                                top:
                                    (selector.clientHeight >= 5
                                        ? selector.clientHeight
                                        : parentSelector.clientHeight) +
                                    "px",
                                left: 0,
                            });
                        }
                        if (checkPosition !== "relative") {
                            Object.assign(error.style, {
                                top:
                                    (selector.offsetTop !== 0
                                        ? selector.offsetTop
                                        : parentSelector.offsetTop) +
                                    (selector.clientHeight !== 0
                                        ? selector.clientHeight
                                        : parentSelector.clientHeight) +
                                    "px",
                                left:
                                    (selector.offsetLeft !== 0
                                        ? selector.offsetLeft
                                        : parentSelector.offsetLeft) + "px",
                            });
                        }
                        if (selector.type === "radio") {
                            Object.assign(error.style, {
                                top:
                                    parentSelector.offsetTop +
                                    parentSelector.clientHeight +
                                    10 +
                                    "px",
                                left: parentSelector.offsetLeft + "px",
                            });
                        }
                    }
                    function actionNoParentElement(
                        errorMessage,
                        selector,
                        isSubmit = true
                    ) {
                        var errorElement = createErrorElement(selector);
                        if (errorMessage) {
                            if (isSubmit) {
                                errorSelector.push(selector);
                                errorSelector[0].focus();
                            }
                            errorElement.innerHTML = errorMessage;
                            switch (selector.type) {
                                case "checkbox":
                                case "radio":
                                    const parentMaxSelector =
                                        selector.parentElement
                                            .parentElement;
                                    if (
                                        parentMaxSelector.nextElementSibling ==
                                        null ||
                                        !parentMaxSelector.nextElementSibling.classList.contains(
                                            "r-error-message"
                                        )
                                    ) {
                                        insertAfter(
                                            parentMaxSelector,
                                            errorElement
                                        );
                                    }
                                    break;
                                default:
                                    if (
                                        selector.nextElementSibling ==
                                        undefined ||
                                        (selector.nextElementSibling !==
                                            undefined &&
                                            selector.nextElementSibling
                                                .className !==
                                            "r-error-message")
                                    ) {
                                        insertAfter(selector, errorElement);
                                        if (
                                            selector.hasAttribute(
                                                "no-border"
                                            )
                                        )
                                            return;
                                        // selector.style.border = "1px solid " + _colorBorder;
                                    }
                                    break;
                            }
                        }
                    }
                    function handleClearError(event) {
                        const selector = event.target;
                        var parentElement = false;
                        if (formElement.hasAttribute("parent")) {
                            parentElement = getParent(
                                selector,
                                formElement.getAttribute("parent")
                            );
                        }
                        switch (selector.type) {
                            case "checkbox":
                            case "radio":
                                if (!parentElement) {
                                    var errorElement =
                                        selector.parentElement.parentElement
                                            .nextElementSibling;
                                    if (
                                        errorElement !== undefined &&
                                        errorElement !== null &&
                                        errorElement.className ===
                                        "r-error-message"
                                    ) {
                                        removeStyle(errorElement);
                                    }
                                } else {
                                    const errorElement =
                                        parentElement.nextElementSibling;
                                    if (
                                        errorElement !== null &&
                                        errorElement !== undefined &&
                                        errorElement.classList.contains(
                                            "r-error-message"
                                        )
                                    ) {
                                        removeStyle(errorElement);
                                    }
                                }
                                break;
                            case "select-one":
                                if (selector.value == "") {
                                    handleValidateFocus(event);
                                    break;
                                }
                            default:
                                if (
                                    !parentElement &&
                                    selector.nextElementSibling !== null &&
                                    selector.nextElementSibling !==
                                    undefined &&
                                    selector.nextElementSibling
                                        .className === "r-error-message"
                                ) {
                                    selector.style.removeProperty("border");
                                    removeStyle(
                                        selector.nextElementSibling
                                    );
                                } else if (
                                    parentElement &&
                                    parentElement.querySelector(
                                        ".r-error-message"
                                    )
                                ) {
                                    var parentElement = getParent(
                                        selector,
                                        formElement.getAttribute("parent")
                                    );
                                    removeStyle(
                                        parentElement.querySelector(
                                            ".r-error-message"
                                        )
                                    );
                                    parentElement.style.removeProperty(
                                        "border"
                                    );
                                }
                                break;
                        }
                    }
                    function removeStyle(element) {
                        element.animate(
                            [{ opacity: 0, transform: "translateY(5px)" }],
                            {
                                duration: 300,
                                fill: "forwards",
                            }
                        ).onfinish = function () {
                            element.remove();
                        };
                    }
                    function handleValidateFocus(event) {
                        var selector = event.target;
                        var rules = addRulesSelector(selector);
                        var errorMessage;
                        for (var rule of rules) {
                            if (
                                selector.type != "file" &&
                                selector.value.length == 0
                            )
                                break;
                            errorMessage = rule(selector);
                            if (errorMessage) {
                                break;
                            }
                        }
                        var parentElement = false;
                        if (formElement.hasAttribute("parent")) {
                            parentElement = getParent(
                                selector,
                                formElement.getAttribute("parent")
                            );
                        }
                        if (parentElement) {
                            actionHasParentElement(
                                parentElement,
                                errorMessage,
                                selector,
                                false
                            );
                        } else {
                            actionNoParentElement(
                                errorMessage,
                                selector,
                                false
                            );
                        }
                        return !errorMessage;
                    }
                    function checkValidateNow(elements) {
                        let isValid = true;
                        isAbsolute = true;
                        for (var selector of elements) {
                            if (
                                !handleSubmitValidate({ target: selector })
                            ) {
                                isValid = false;
                                if (checkOne) {
                                    break;
                                }
                            }
                        }
                        return isValid;
                    }
                    function handleSubmitValidate(event) {
                        var selector = event.target;
                        var rules = addRulesSelector(selector);
                        var errorMessage = undefined;
                        for (const rule of rules) {
                            errorMessage = rule(selector);
                            if (errorMessage) {
                                break;
                            }
                        }
                        if (errorMessage) {
                            var parentElement = false;
                            if (formElement.hasAttribute("parent")) {
                                parentElement = getParent(
                                    selector,
                                    formElement.getAttribute("parent")
                                );
                            }
                            if (parentElement) {
                                actionHasParentElement(
                                    parentElement,
                                    errorMessage,
                                    selector,
                                    true
                                );
                            } else {
                                actionNoParentElement(
                                    errorMessage,
                                    selector,
                                    true
                                );
                            }
                        } else {
                            handleClearError({ target: selector });
                        }
                        return !errorMessage;
                    }
                    function clearForm() {
                        window.dispatchEvent(
                            new CustomEvent("validate.form.clear", {
                                detail: {
                                    formElement: formElement,
                                },
                            })
                        );
                        const inputs =
                            formElement.querySelectorAll("[name]");
                        inputs.forEach(function (element) {
                            switch (element.type) {
                                case "checkbox":
                                case "radio":
                                    element.checked = false;
                                    break;
                                case "select-one":
                                    if (
                                        element.hasAttribute("clear-option")
                                    ) {
                                        element.innerHTML = `<option value="">${element.getAttribute(
                                            "clear-option"
                                        )}</option>`;
                                    }
                                    element.selectedIndex = 0;
                                    break;
                                case "hidden":
                                    break;
                                case "file":
                                    element.value = "";
                                    const name = element.name.replace(
                                        "[]",
                                        ""
                                    );
                                    const libImage = document.querySelector(
                                        `[gallery-of=${name}]`
                                    );
                                    libImage && (libImage.innerHTML = "");
                                    break;
                                default:
                                    element.value = "";
                                    break;
                            }
                        });
                    }
                    function getStyle(element, property) {
                        return window
                            .getComputedStyle(element, null)
                            .getPropertyValue(`'${property}'`);
                    }
                    function submitForm(data, formElement, button) {
                        var check = formElement.dataset.success;
                        if (!check) {
                            return formElement.submit();
                        }
                        var dataOuter = formElement.hasAttribute(
                            "data-outer"
                        )
                            ? formElement.getAttribute("data-outer")
                            : false;
                        if (dataOuter) {
                            data = callFunction(dataOuter, [data]);
                        }
                        if (
                            button.hasAttribute("value") &&
                            button.hasAttribute("name")
                        ) {
                            data[button.name] = button.value;
                        }
                        var method = formElement.getAttribute("method");
                        var url = formElement.getAttribute("action");
                        var ajax = new XMLHttpRequest();
                        ajax.open(method, url, true);
                        ajax.setRequestHeader(
                            "X-Requested-With",
                            "XMLHttpRequest"
                        );
                        ajax.onreadystatechange = function () {
                            if (ajax.readyState === XMLHttpRequest.DONE) {
                                var status = ajax.status;
                                if (
                                    status === 0 ||
                                    (status >= 200 && status < 400)
                                ) {
                                    const dataResponse = isJson(
                                        ajax.responseText
                                    )
                                        ? JSON.parse(ajax.responseText)
                                        : ajax.responseText;
                                    if (
                                        isClear &&
                                        "code" in dataResponse &&
                                        dataResponse.code == 200
                                    ) {
                                        clearForm();
                                    }
                                    callFunction(check, [
                                        dataResponse,
                                        data,
                                        formElement,
                                        button,
                                    ]);
                                }
                            }
                            resetButton(button);
                        };
                        var formData = new FormData();
                        if (data.image) {
                            Array.from(data.image).forEach(function (file) {
                                formData.append(nameInputFile + "[]", file);
                            });
                        }
                        for (const [key, value] of Object.entries(data)) {
                            if (
                                key.indexOf("[]") > -1 ||
                                (value instanceof Array && value.length > 1)
                            ) {
                                value.forEach(function (val) {
                                    formData.append(
                                        key.indexOf("[]") > -1
                                            ? key
                                            : key + "[]",
                                        val
                                    );
                                });
                            } else if (value instanceof Array) {
                                formData.append(key, value);
                            } else if (nameInputFile !== key || !gallery) {
                                formData.append(key, value);
                            } else {
                                formData.append(key, value);
                            }
                        }
                        if (button) {
                            buttonFormBeforeSubmit(button);
                        }
                        ajax.send(formData);
                    }
                    function resetButton(button) {
                        if (!button) return;
                        if (button.hasAttribute("style-old")) {
                            button.setAttribute(
                                "style",
                                button.getAttribute("style-old")
                            );
                        }
                        button.innerHTML =
                            button.getAttribute("content-old");
                        button.disabled = false;
                    }
                    function buttonFormBeforeSubmit(button) {
                        if (button.getAttribute("style")) {
                            button.setAttribute(
                                "style-old",
                                button.getAttribute("style")
                            );
                        }
                        const styles = getComputedStyle(button);
                        const buttonRect = button.getBoundingClientRect();
                        Object.assign(button.style, {
                            width: `${buttonRect.width}px`,
                            height: `${buttonRect.height}px`,
                            position:
                                styles.position == "static"
                                    ? "relative"
                                    : styles.position,
                        });
                        if (button.hasAttribute("content")) {
                            button.setAttribute(
                                "content-old",
                                button.getAttribute("content")
                            );
                        } else {
                            button.setAttribute(
                                "content-old",
                                button.innerHTML
                            );
                        }
                        button.disabled = true;
                        const colorButton = getStyle(button, "color");
                        setTimeout(() => {
                            button.innerHTML = `<style style="height:0;width:0;overflow:hidden;display:block">.r-s-loader{position:absolute;left:50%;top:50%;border:5px solid ${colorButton};border-radius:50%;border-top:5px solid ${colorButton};border-bottom:5px solid ${colorButton};border-left:5px solid transparent;border-right:5px solid transparent;width:${buttonRect.height - 12
                                }px;height:${buttonRect.height - 12
                                }px;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:translate(-50%,-50%) rotate(0)}100%{-webkit-transform:translate(-50%,-50%) rotate(360deg)}}@keyframes spin{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}</style><div class="r-s-loader"></div>`;
                        }, _timeLoad);
                        return button;
                    }
                    if (formElement) {
                        var elements = formElement.querySelectorAll(
                            "[rules]:not([disabled]):not([type=radio]):not([type=checkbox])"
                        );
                        for (var selector of elements) {
                            //  Láº¯ng nghe sá»± kiĂªn validate (blur,change,click)
                            selector.addEventListener(
                                "blur",
                                handleValidateFocus
                            );
                            selector.addEventListener(
                                "input",
                                handleClearError
                            );
                            selector.addEventListener(
                                "click",
                                handleClearError
                            );
                            selector.addEventListener("change", (event) => {
                                if (selector.type != "text") {
                                    handleClearError(event);
                                } else {
                                    handleValidateFocus(event);
                                }
                            });
                        }
                        if (formLive == null) {
                            formElement
                                .querySelectorAll(
                                    'button:not([type="button"])'
                                )
                                .forEach(
                                    (buttonSubmit) =>
                                    (buttonSubmit.onclick = (e) => {
                                        formElement.onsubmit = async (
                                            event
                                        ) =>
                                            await formSubmit(
                                                event,
                                                buttonSubmit
                                            );
                                    })
                                );
                        }
                        async function formSubmit(event, buttonSubmit) {
                            errorSelector = [];
                            formElement = event.target.closest(FORM_CLASS);
                            event.preventDefault();
                            var isValid = true;
                            var isValidCheck = true;
                            if (
                                hasFuncBefore != null &&
                                (await callFunction(hasFuncBefore, []))
                            ) {
                                return false;
                            }
                            for (var selector of elements) {
                                if (
                                    !handleSubmitValidate({
                                        target: selector,
                                    })
                                ) {
                                    isValid = false;
                                    if (checkOne) {
                                        break;
                                    }
                                }
                            }
                            if (Object.keys(options).length != 0) {
                                options.rules[indexFormMain].forEach(
                                    function (rule) {
                                        if (!isValidCheck) return;
                                        var inputElements =
                                            formElement.querySelectorAll(
                                                `${rule.selector}`
                                            );
                                        if (inputElements.length > 0) {
                                            isValidCheck =
                                                validateRadioCheckBox(
                                                    rule,
                                                    true
                                                );
                                            if (!isValidCheck) {
                                                isValidCheck = false;
                                            }
                                        }
                                    }
                                );
                            }
                            if (!isValid) {
                                return false;
                            }
                            // Capcha google
                            isValid = await checkGoogleCapcha(
                                buttonSubmit,
                                isValid
                            );
                            var enableInputs = formElement.querySelectorAll(
                                "[name]:not([disabled])"
                            );
                            var formValues = buildObjectData(enableInputs);
                            if (
                                (hasFuncPlus == null ||
                                    (await callFunction(hasFuncPlus, [
                                        formElement,
                                        formValues,
                                    ]))) &&
                                isValid &&
                                isValidCheck
                            ) {
                                submitForm(
                                    formValues,
                                    formElement,
                                    buttonSubmit
                                );
                            } else {
                                errorSelector = [];
                            }
                        }
                        const radioElements = formElement.querySelectorAll(
                            'input[type=radio][rules="required"]'
                        );
                        const checkBoxElements =
                            formElement.querySelectorAll(
                                'input[type=checkbox][rules="required"]'
                            );
                        const listRadio = Array.from(radioElements).reduce(
                            (list, current, index) => {
                                if (
                                    !list.some(
                                        (name) => name == current.name
                                    )
                                ) {
                                    list.push(current.name);
                                }
                                return list;
                            },
                            []
                        );
                        const listCheckBox = Array.from(
                            checkBoxElements
                        ).reduce((list, current, index) => {
                            if (
                                !list.some((name) => name == current.name)
                            ) {
                                list.push(current.name);
                            }
                            return list;
                        }, []);
                        if (listRadio.length > 0) {
                            listRadio.forEach((name) =>
                                options.rules[indexFormMain].push(
                                    isRequired(
                                        `form[check] input[type="radio"][rules="required"][name="${name}"]`
                                    )
                                )
                            );
                        }
                        if (listCheckBox.length > 0) {
                            listCheckBox.forEach((name) =>
                                options.rules[indexFormMain].push(
                                    isRequired(
                                        `form[check] input[type="checkbox"][rules="required"][name="${name}"]`
                                    )
                                )
                            );
                        }
                        if (Object.keys(options).length != 0) {
                            options.rules[indexFormMain].forEach(function (
                                rule
                            ) {
                                // LÆ°u láº¡i cĂ¡c rules cho má»—i input
                                if (
                                    Array.isArray(
                                        selectorRules[rule.selector]
                                    )
                                ) {
                                    selectorRules[rule.selector].push(
                                        rule.check
                                    );
                                } else {
                                    selectorRules[rule.selector] = [
                                        rule.check,
                                    ];
                                }
                                var inputElements =
                                    formElement.querySelectorAll(
                                        `${rule.selector}`
                                    );
                                for (const inputElement of inputElements) {
                                    inputElement.onchange = () =>
                                        validateRadioCheckBox(rule, false);
                                }
                            });
                        }
                    }
                    function addRulesSelector(selector) {
                        const formRules = {};
                        var rules = selector
                            .getAttribute("rules")
                            .split("||");
                        for (var rule of rules) {
                            var ruleInfo;
                            var isRuleHasValue = rule.includes(":");
                            if (isRuleHasValue) {
                                ruleInfo = rule.split(":");
                                rule = ruleInfo[0];
                            }
                            var ruleFunc = validatorRules[rule];
                            if (rule.includes("regex")) {
                                ruleFunc = validatorRules["regex"];
                            }
                            if (isRuleHasValue) {
                                var ruleFunc = ruleFunc(
                                    ruleInfo[1],
                                    formElement
                                );
                            }
                            if (Array.isArray(formRules[selector.name])) {
                                formRules[selector.name].push(ruleFunc);
                            } else {
                                formRules[selector.name] = [ruleFunc];
                            }
                        }
                        return formRules[selector.name];
                    }
                    async function checkGoogleCapcha(
                        buttonSubmit,
                        isValid
                    ) {
                        if (!isValid) {
                            return false;
                        }
                        if (
                            typeof grecaptcha != "undefined" &&
                            buttonSubmit.classList.contains("g-recaptcha")
                        ) {
                            var token = await new Promise(
                                (resolve, reject) => {
                                    grecaptcha.ready(function () {
                                        grecaptcha
                                            .execute(
                                                buttonSubmit.dataset.key,
                                                {
                                                    action: "submit",
                                                }
                                            )
                                            .then(function (token) {
                                                resolve(token);
                                            });
                                    });
                                }
                            );
                            const data = await XHR.send({
                                url: "dang-nhap/kiem-tra-capcha-google",
                                method: "POST",
                                data: {
                                    response: token,
                                },
                            });
                            return data.score >= 0.5;
                        } else {
                            return isValid;
                        }
                    }
                    function buildObjectData(enableInputs) {
                        return Array.from(enableInputs).reduce(function (
                            values,
                            input
                        ) {
                            switch (input.type) {
                                case "radio":
                                    var radioChecked =
                                        formElement.querySelector(
                                            `input[name="${input.name}"]:checked`
                                        );
                                    if (radioChecked !== null) {
                                        values[input.name] =
                                            radioChecked.value;
                                    } else {
                                        values[input.name] = "";
                                    }
                                    break;
                                case "checkbox":
                                    if (input.matches(":checked")) {
                                        if (
                                            !Array.isArray(
                                                values[input.name]
                                            )
                                        ) {
                                            values[input.name] = [];
                                        }
                                        values[input.name].push(
                                            input.value
                                        );
                                    } else if (
                                        input.name.indexOf("[]") > -1
                                    ) {
                                        values[input.name] = [];
                                    } else if (
                                        values[input.name] == undefined
                                    ) {
                                        values[input.name] = "";
                                    }
                                    break;
                                case "file":
                                    if (input.name.indexOf("[]") > -1) {
                                        if (
                                            !Array.isArray(
                                                values[input.name]
                                            )
                                        ) {
                                            values[input.name] = [];
                                        }
                                        values[input.name].push(
                                            ...input.files
                                        );
                                    } else {
                                        if (input.files.length > 0) {
                                            values[input.name] =
                                                input.files[0];
                                        } else {
                                            values[input.name] = "";
                                        }
                                    }
                                    nameInputFile = input.name;
                                    break;
                                case "select-multiple":
                                    const selectOptions =
                                        input.querySelectorAll(
                                            "option:checked"
                                        );
                                    selectOptions.forEach(function (
                                        optionEl
                                    ) {
                                        if (
                                            !Array.isArray(
                                                values[input.name]
                                            )
                                        ) {
                                            values[input.name] = [];
                                        }
                                        values[input.name].push(
                                            optionEl.value
                                        );
                                    });
                                    break;
                                default:
                                    if (input.name.indexOf("[]") > -1) {
                                        if (
                                            !Array.isArray(
                                                values[input.name]
                                            )
                                        ) {
                                            values[input.name] = [];
                                        }
                                        values[input.name].push(
                                            input.value
                                        );
                                    } else {
                                        values[input.name] = input.value;
                                    }
                                    break;
                            }
                            return values;
                        },
                            {});
                    }
                    function clearErrorElement() {
                        const inputDisabled =
                            formElement.querySelectorAll("[name]");
                        inputDisabled.forEach((input) => {
                            const errorElement = formElement.querySelector(
                                `.r-error-message[data-input-name='${input.name}']`
                            );
                            errorElement && removeStyle(errorElement);
                        });
                    }
                    window.onresize = clearErrorElement;
                    if (formLive !== null) {
                        isPassLiveForm = checkValidateNow(elements);
                    } else {
                        return {
                            start: (function () {
                                clearErrorElement();
                            })(),
                        };
                    }
                }
            );
            setStype();
            return isPassLiveForm;
        }
        return {
            load: (async function () {
                await init();
            })(),
            setConfig: function (options) {
                setConfig(options);
            },
            checkForm: async function (form) {
                return await init(form);
            },
            refresh: async function () {
                await init();
            },
        };
    })();
