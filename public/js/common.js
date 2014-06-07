        function isValidEmailAddress(emailAddress) {
                var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
                    // alert( pattern.test(emailAddress) );
                    return pattern.test(emailAddress);
        };

