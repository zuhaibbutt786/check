document.addEventListener('DOMContentLoaded', function() {
    // Handle photo upload click
    document.getElementById('photoUpload').addEventListener('click', function() {
        document.getElementById('photo').click();
    });
    
    // Handle signature upload click
    document.getElementById('signatureUpload').addEventListener('click', function() {
        document.getElementById('signature').click();
    });
    
    // Handle same as permanent address checkbox
    document.getElementById('sameAsPermanent').addEventListener('change', function() {
        const currentAddressSection = document.getElementById('currentAddressSection');
        currentAddressSection.style.display = this.checked ? 'none' : 'block';
        
        if (this.checked) {
            // Copy permanent address values to current address fields
            document.getElementById('currentAddress').value = document.getElementById('permanentAddress').value;
            document.getElementById('currentCity').value = document.getElementById('city').value;
            document.getElementById('currentDistrict').value = document.getElementById('district').value;
            document.getElementById('currentProvince').value = document.getElementById('province').value;
        } else {
            // Clear current address fields
            document.getElementById('currentAddress').value = '';
            document.getElementById('currentCity').value = '';
            document.getElementById('currentDistrict').value = '';
            document.getElementById('currentProvince').value = '';
        }
    });
    
    // Form validation
    function validateForm() {
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        // Mobile number validation (Pakistan format)
        const mobileNumber = document.getElementById('mobileNumber');
        const mobileRegex = /^03\d{2}-\d{7}$/;
        
        if (mobileNumber.value && !mobileRegex.test(mobileNumber.value)) {
            isValid = false;
            mobileNumber.classList.add('is-invalid');
            
            // Add error message if it doesn't exist
            if (!document.getElementById('mobileNumberError')) {
                const errorDiv = document.createElement('div');
                errorDiv.id = 'mobileNumberError';
                errorDiv.className = 'invalid-feedback';
                errorDiv.textContent = 'Please enter a valid mobile number in format 03XX-XXXXXXX';
                mobileNumber.parentNode.appendChild(errorDiv);
            }
        }
        
        // Email validation (if provided)
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value && !emailRegex.test(email.value)) {
            isValid = false;
            email.classList.add('is-invalid');
            
            // Add error message if it doesn't exist
            if (!document.getElementById('emailError')) {
                const errorDiv = document.createElement('div');
                errorDiv.id = 'emailError';
                errorDiv.className = 'invalid-feedback';
                errorDiv.textContent = 'Please enter a valid email address';
                email.parentNode.appendChild(errorDiv);
            }
        }
        
        return isValid;
    }
    
    // Format mobile number as user types
    document.getElementById('mobileNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length > 4) {
            value = value.substring(0, 4) + '-' + value.substring(4);
        }
        
        if (value.length > 12) {
            value = value.substring(0, 12);
        }
        
        e.target.value = value;
    });
    
    // Display file name when a file is selected
    document.getElementById('photo').addEventListener('change', function() {
        if (this.files.length > 0) {
            const photoUpload = document.getElementById('photoUpload');
            photoUpload.querySelector('p').textContent = 'Selected: ' + this.files[0].name;
            photoUpload.querySelector('i').className = 'fas fa-check';
            
            // Preview image if possible
            const file = this.files[0];
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'img-thumbnail mt-2';
                    img.style.maxHeight = '150px';
                    
                    // Remove any existing preview
                    const existingPreview = photoUpload.querySelector('img');
                    if (existingPreview) {
                        existingPreview.remove();
                    }
                    
                    photoUpload.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }
    });
    
    document.getElementById('signature').addEventListener('change', function() {
        if (this.files.length > 0) {
            const signatureUpload = document.getElementById('signatureUpload');
            signatureUpload.querySelector('p').textContent = 'Selected: ' + this.files[0].name;
            signatureUpload.querySelector('i').className = 'fas fa-check';
            
            // Preview image if possible
            const file = this.files[0];
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'img-thumbnail mt-2';
                    img.style.maxHeight = '100px';
                    
                    // Remove any existing preview
                    const existingPreview = signatureUpload.querySelector('img');
                    if (existingPreview) {
                        existingPreview.remove();
                    }
                    
                    signatureUpload.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }
    });
    
    // Form submission
    document.getElementById('nadraForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
            
            // Simulate form submission (would be an AJAX call to server in real app)
            setTimeout(function() {
                // Create success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message text-center';
                successDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h4>Application Submitted Successfully!</h4>
                    <p>Your NADRA application has been received. Your application reference number is: <strong>NAD-${Math.floor(Math.random() * 1000000)}</strong></p>
                    <p>Please visit your nearest NADRA center with original documents for biometric verification.</p>
                `;
                
                // Insert success message at the top of the form
                const form = document.getElementById('nadraForm');
                form.parentNode.insertBefore(successDiv, form);
                
                // Hide the form
                form.style.display = 'none';
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Show success message with animation
                successDiv.style.display = 'block';
                successDiv.style.animation = 'fadeIn 0.5s ease-out forwards';
            }, 2000);
        }
    });
    
    // Save as Draft functionality
    document.querySelector('button.btn-outline-secondary').addEventListener('click', function() {
        // In a real application, this would save the form data to localStorage or send to server
        const formData = new FormData(document.getElementById('nadraForm'));
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // For demo purposes, just show an alert
        alert('Your application has been saved as draft. You can continue later.');
        
        // In a real app, you might do:
        // localStorage.setItem('nadraFormDraft', JSON.stringify(formObject));
    });
});