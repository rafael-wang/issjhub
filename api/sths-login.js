var LoginUI = (function($) {
    var me = {
        _init: function() {
            var el = $('#shs-login-form');
            var self = this;

            // ajax login form
            el.on('submit', function(e) {
                var btnName = e.originalEvent.submitter.name;
                var btnVal = e.originalEvent.submitter.value;
                var formData = el.serialize();
                if (btnName && btnVal) {
                    formData = encodeURIComponent(btnName) + '=' + encodeURIComponent(btnVal) + '&' + formData;
                }
                $.ajax({
                    type: "POST",
                    url: el.attr('action') ? el.attr('action') : window.location,
                    data: formData, 
                    context: self,
                    success: self.onFormSuccess,
                    error: self.onFormError
                });

                e.preventDefault();
                el.data('timeout', window.setTimeout(function() {
                    self.disableForm();
                }, 0));
            });

            $('#shs-login-form input').on('input', function(e) {
                $(this).removeClass('error');
            });

            $(window).on('load', function(e) {                
                $fel = $('[autofocus=autofocus]').first();
                if (($fel).val()) {
                    $els = $fel.closest('form').find('input');
                    for (var i = 0; i < $els.length; i++) {
                        $el = $($els[i]);
                        if (!$el.val()) {
                            $el.focus();
                            break;
                        }
                    }
                }
            });
        },

        onFormError: function(xhr, status, error) {   
            if (xhr.responseJSON && 'exception' in xhr.responseJSON) {
                LoginHandler.resultShowMessage({
                    type: 'error',
                    title: 'Error ' + xhr.responseJSON.exception[0].type,
                    message: 'An error was encountered servicing your request: ' + xhr.responseJSON.exception[0].message + ' (' + xhr.responseJSON.exception[0].type + ')'
                });
            } else {
                LoginHandler.resultShowMessage({
                    type: 'error',
                    title: error,
                    message: 'An error was encountered servicing your request: ' + error + ' (' + xhr.status + ')'
                });
            }
            this.enableForm();
        },

        onFormSuccess: function(data, status, xhr) {
            // Extract the username and password from the form
            var username = $('#fld-username-fld').val();
            var password = $('#fld-password-fld').val();

            // Check credentials
            if (username === 'rafael.wang' && password === 'sthsportal') {
                // Redirect to /login.html if credentials match
                window.location.href = '/login.html';
            } else {
                // Show default error message if credentials don't match
                LoginHandler.resultShowMessage({
                    type: 'error',
                    title: 'Invalid Login',
                    message: 'The username or password is incorrect. Please try again.'
                });
                this.enableForm(); // Re-enable the form for re-entry
            }
        },

        disableForm: function() {
            $('#shs-login-form :input').prop('disabled', true);
            $('#shs-login-form input[type=submit]').prop('disabled', true);
        },

        enableForm: function() {
            if ($('#shs-login-form').data('timeout')) window.clearTimeout($('#shs-login-form').data('timeout'));
            $('#shs-login-form :input').each(function(i) {
                $this = $(this);
                if (!$this.attr('data-disabled')) {
                    $this.prop('disabled', false);
                }
            });
            $('#shs-login-form input[type=submit]').prop('disabled', false);

            if ($('#shs-login-message').text().indexOf('password') > -1) {
                $('#shs-login-form input[type=password]').addClass('error').focus();
            } else if ($('#shs-login-message').text().trim() != '') {
                $('#shs-login-form input[type=text]').addClass('error').focus();
            }            
        },

        hideForm: function() {
            $('#shs-login-form').slideUp();
        },

        showForm: function() {
            $('#shs-login-form').slideDown();
        }
    };

    me._init();
    window.LoginUI = me;
});
