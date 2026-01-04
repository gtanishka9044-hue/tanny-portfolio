// ============================================
// FORM VALIDATION AND SUBMISSION
// Contact Form Validation
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        setupFormValidation();
        setupFormSubmission();
    }
});

// ============================================
// Form Validation Setup
// ============================================
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        // Real-time validation on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Clear error on input
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
}

// ============================================
// Validate Individual Field
// ============================================
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }

    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Name validation (minimum length)
    if (fieldName === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long.';
    }

    // Message validation (minimum length)
    if (fieldName === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }

    // Subject validation (minimum length)
    if (fieldName === 'subject' && value && value.length < 3) {
        isValid = false;
        errorMessage = 'Subject must be at least 3 characters long.';
    }

    // Display or clear error
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

// ============================================
// Get Field Label
// ============================================
function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Name',
        'email': 'Email',
        'subject': 'Subject',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

// ============================================
// Show Field Error
// ============================================
function showFieldError(field, message) {
    // Add error class to field
    field.classList.add('error');
    field.style.borderColor = '#ef4444';

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block;';

    // Insert error message after field
    field.parentNode.appendChild(errorElement);
}

// ============================================
// Clear Field Error
// ============================================
function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// ============================================
// Form Submission Setup
// ============================================
function setupFormSubmission() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showFormMessage('Please fix the errors above.', 'error');
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Show loading state
        setFormLoading(true);

        try {
            // Submit form (using EmailJS, Firebase, or simple console log for demo)
            await submitForm(formData);
            
            // Show success message
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            setFormLoading(false);
        }
    });
}

// ============================================
// Submit Form Data
// ============================================
async function submitForm(formData) {
    // Option 1: Log to console (for demo)
    console.log('Form submitted:', formData);
    
    // Option 2: Use EmailJS (free service)
    // You can integrate EmailJS by adding their script and using:
    // emailjs.send('service_id', 'template_id', formData);
    
    // Option 3: Use Firebase (if configured)
    if (typeof window.submitContactFormToFirebase === 'function') {
        await window.submitContactFormToFirebase(formData);
        return;
    }
    
    // Option 4: Use FormSpree or other form service
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
    // if (!response.ok) throw new Error('Submission failed');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
}

// ============================================
// Set Form Loading State
// ============================================
function setFormLoading(isLoading) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

    if (submitBtn) {
        submitBtn.disabled = isLoading;
        
        if (submitText) {
            submitText.style.display = isLoading ? 'none' : 'inline';
        }
        
        if (submitLoader) {
            submitLoader.style.display = isLoading ? 'inline' : 'none';
        }
    }

    // Disable inputs during submission
    inputs.forEach(input => {
        input.disabled = isLoading;
    });
}

// ============================================
// Show Form Message
// ============================================
function showFormMessage(message, type = 'success') {
    const messageDiv = document.getElementById('formMessage');
    
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.style.background = type === 'success' ? '#10b981' : '#ef4444';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '1rem';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.marginTop = '1rem';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Also use notification if available
    if (typeof showNotification === 'function') {
        showNotification(message, type);
    }
}

