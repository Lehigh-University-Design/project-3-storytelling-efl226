document.addEventListener('DOMContentLoaded', () => {
            const introHeader = document.getElementById('intro-header'); 
            const stickyCanvas = document.getElementById('sticky-canvas'); 
            const stickyNav = document.getElementById('sticky-nav'); 
            const navTitle = document.getElementById('nav-title'); 
            const resetButton = document.getElementById('reset-button'); 
            const navButtons = document.querySelectorAll('#nav-links button'); 
            
            const headphoneImage = document.getElementById('headphone-image');
            const bassBackgroundImage = document.getElementById('bass-background-image'); 
            const clarityBackgroundImage = document.getElementById('clarity-background-image'); 
            const allModelImages = [headphoneImage, bassBackgroundImage, clarityBackgroundImage]; 

            const scenes = document.querySelectorAll('.scene');
            const choiceButtons = document.querySelectorAll('.choice-button');
            const productNameInput = document.getElementById('product-name-input');
            
            // The absolute URL to the image directory
            const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/Lehigh-University-Design/project-3-storytelling-efl226/main/images/'; 

            // Description elements and map
            const descCasing = document.getElementById('desc-casing');
            const descCushion = document.getElementById('desc-cushion');
            const descDriver = document.getElementById('desc-driver');
            const allDescriptions = [descCasing, descCushion, descDriver];
            const descriptionMap = {
                bamboo: "Warm, natural acoustics from sustainable bamboo.",
                aluminum: "A sleek, durable shell of brushed aluminum.",
                cotton: "Breathable Black Cotton for lightweight, cool comfort.",
                carbon: "Ultra-light and robust carbon fiber framework.", 
                clarity: "A precision driver tuned for studio-grade clarity.",
                bass: "A custom driver built for deep, rich bass."
            };

            // To store the user's configuration
            let userChoices = {
                // Initialize with 'studio' so an image shows immediately on scroll
                model: 'studio', 
                casing: null,
                cushion: null,
                driver: null,
                name: 'Base Model',
                vibe: null
            };

            // Summary text spans
            const summaryName = document.getElementById('summary-name');
            const adSlogan = document.getElementById('ad-slogan');
            const adBody = document.getElementById('ad-body');
            const summaryCasing = document.getElementById('summary-casing');
            const summaryCushion = document.getElementById('summary-cushion');
            const summaryDriver = document.getElementById('summary-driver');


            // Helper to set image source and handle loading/errors
            function loadImage(imgElement, filename) {
                const normalizedFilename = filename.toLowerCase(); 
                const newSrc = IMAGE_BASE_URL + normalizedFilename;
                
                // console.log('Loading:', newSrc); // Debug

                if (imgElement.src !== newSrc) {
                    imgElement.style.opacity = 0;
                    imgElement.onload = () => {
                        imgElement.style.opacity = 1;
                    };
                    imgElement.onerror = () => {
                        imgElement.src = 'https://placehold.co/500x500/1c1c1c/999999?text=Image+Missing'; 
                        imgElement.style.opacity = 1; 
                        console.warn('Image not found for:', newSrc);
                    };
                    imgElement.src = newSrc;
                }
            }


            // Function to manage all visible images based on current scene and choices
            function updateDisplayImages(currentScene) {
                const { model, casing, cushion, driver } = userChoices;
                
                
                if (model) {
                    let filename = '';
                    
                 
                    if (cushion && casing) {
                         // Full build available
                         filename = `${model}-${casing}-${cushion}.png`;
                         
                         
                         if (currentScene === 3) {
                             filename = `${model}-${casing}.png`;
                         } else if (currentScene === 2) {
                             filename = `${model}-base.png`;
                         }
                         // For Scene 4, 5, 6, 7, 8 -> show full build
                    } else if (casing) {
                         // Casing available
                         if (currentScene === 2) {
                             filename = `${model}-base.png`;
                         } else {
                             // Scene 3+
                             filename = `${model}-${casing}.png`;
                         }
                    } else {
                        // Only base model available
                        filename = `${model}-base.png`;
                    }
                    
                    loadImage(headphoneImage, filename);
                    // Ensure headphone is visible
                    headphoneImage.style.opacity = 1; 
                }

                // 2. BACKGROUND LOGIC (Driver Section)
                // Default: Hide backgrounds
                bassBackgroundImage.style.opacity = 0;
                clarityBackgroundImage.style.opacity = 0;

                // Show background only if in Driver scene (5) or later AND driver is selected
                if (currentScene >= 5 && driver) {
                    if (driver === 'bass') {
                        loadImage(bassBackgroundImage, 'bass-background.png');
                        bassBackgroundImage.style.opacity = 1; // Explicitly show
                    } else if (driver === 'clarity') {
                        loadImage(clarityBackgroundImage, 'clarity-background.png');
                         clarityBackgroundImage.style.opacity = 1; // Explicitly show
                    }
                }
            }


            // This function updates all the text in the final summary AND the navigation title 
            function updateSummaryText() {
                const productName = userChoices.name || "Resonant Design Build";
                summaryName.textContent = productName;
                navTitle.textContent = productName; 

                summaryCasing.textContent = userChoices.casing ? (userChoices.casing === 'bamboo' ? 'Sustainable Bamboo' : 'Brushed Aluminum') : '...';
                summaryCushion.textContent = userChoices.cushion ? (userChoices.cushion === 'cotton' ? 'Breathable Black Cotton' : 'Carbon Fiber') : '...';
                summaryDriver.textContent = userChoices.driver ? (userChoices.driver === 'clarity' ? 'Studio Clarity' : 'Deep Bass') : '...';

                let slogan = "A sound that is uniquely yours."; 
                let body = `Introducing the new ${productName}. Designed by you.`; 
                const { model, vibe } = userChoices; 
                
                if (!model || !vibe) {
                     slogan = "Your unique campaign awaits..."; 
                     body = "Make your selections above to generate your custom brand story and advertisement."
                }
                else if (model === 'studio' && vibe === 'minimal') { slogan = "Pure. Uncompromising. Yours."; body = `For the listener who hears everything. The Studio (Over-Ear) delivers sound as it was intended. No distortion. No compromise.`; } 
                else if (model === 'studio' && vibe === 'bold') { slogan = "Hear the Revolution."; body = `Don't just listen to music. Feel it. The Studio (Over-Ear) with the Deep Bass driver is a statement.`; } 
                else if (model === 'studio' && vibe === 'eco') { slogan = "Natural Sound. Natural Materials."; body = `True-to-life audio from sustainable materials. The Studio (Over-Ear) connects you to your music and the planet.`; } 
                else if (model === 'go' && vibe === 'minimal') { slogan = "Your World. Your Sound."; body = `Silence the city. Elevate your journey. The Go (On-Ear) is your personal oasis in a world of noise.`; } 
                else if (model === 'go' && vibe === 'bold') { slogan = "Own the Commute."; body = `Make your soundtrack the only one that matters. The Go (On-Ear) is your escape.`; } 
                else if (model === 'go' && vibe === 'eco') { slogan = "A Better Journey. A Better Planet."; body = `Move through the world with purpose. The Go (On-Ear), built with sustainable materials for the conscious traveler.`; } 
                
                adSlogan.textContent = slogan;
                adBody.textContent = body;
            }

            // Click listeners
            choiceButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const choice = button.dataset.choice; 
                    const value = button.dataset.value;   
                    const sceneNumber = parseInt(button.closest('.scene').dataset.scene);

                    userChoices[choice] = value;

                    document.querySelectorAll(`.choice-button[data-choice="${choice}"]`).forEach(btn => {
                        btn.classList.remove('active');
                    });
                    button.classList.add('active');

                    if (choice === 'casing') {
                        descCasing.innerHTML = descriptionMap[value] || '';
                    } else if (choice === 'cushion') {
                        descCushion.innerHTML = descriptionMap[value] || ''; 
                    } else if (choice === 'driver') {
                        descDriver.innerHTML = descriptionMap[value] || '';
                    }

                    updateDisplayImages(sceneNumber); 
                    updateSummaryText();
                });
            });

            // Name input listener
            productNameInput.addEventListener('input', (e) => {
                userChoices.name = e.target.value;
                updateSummaryText();
            });
            
            // Scroll Logic
            let hasScrolledOnce = false;
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50 && !hasScrolledOnce) {
                    introHeader.classList.add('hidden');
                    stickyCanvas.classList.add('model-active');
                    stickyNav.classList.add('visible'); 
                    hasScrolledOnce = true;
                } 
                else if (window.scrollY <= 50 && hasScrolledOnce) {
                    introHeader.classList.remove('hidden');
                    stickyCanvas.classList.remove('model-active');
                    stickyNav.classList.remove('visible'); 
                    hasScrolledOnce = false; 
                } 

                let currentScene = 0;
                scenes.forEach(scene => {
                    const rect = scene.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentScene = parseInt(scene.dataset.scene);
                    }
                });

                scenes.forEach(scene => {
                    const sceneNumber = parseInt(scene.dataset.scene);
                    const textContent = scene.querySelector('.text-content');
                    if (sceneNumber === currentScene) {
                        textContent.classList.add('active');
                    } else {
                        textContent.classList.remove('active');
                    }
                });
                
                allDescriptions.forEach(desc => desc.classList.remove('visible'));

                if (currentScene === 3 && userChoices.casing) {
                    descCasing.classList.add('visible');
                } else if (currentScene === 4 && userChoices.cushion) {
                    descCushion.classList.add('visible');
                } else if ((currentScene === 5 || currentScene === 8) && userChoices.driver) {
                    descDriver.classList.add('visible');
                }
                
                updateDisplayImages(currentScene);
                
                const modelElement = document.getElementById('headphone-model');
                
                if (currentScene === 2) {
                    modelElement.style.transform = 'rotateY(0deg) rotateX(0deg)';
                } else if (currentScene === 3) {
                    modelElement.style.transform = 'rotateY(15deg) rotateX(5deg)';
                } else if (currentScene === 4) {
                    modelElement.style.transform = 'rotateY(-15deg) rotateX(10deg)';
                } else {
                    modelElement.style.transform = 'rotateY(0deg) rotateX(0deg)';
                }
            });
            
            updateSummaryText();
            
            navButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetScene = button.dataset.targetScene;
                    const targetElement = document.querySelector(`.scene[data-scene="${targetScene}"]`);
                    if (targetElement) {
                        const offset = 64; 
                        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                            top: elementPosition - offset,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            resetButton.addEventListener('click', () => {
                userChoices = { model: 'studio', casing: null, cushion: null, driver: null, name: 'Aura One', vibe: null };
                
                document.querySelectorAll('.choice-button.active').forEach(btn => btn.classList.remove('active'));
                productNameInput.value = 'Aura One';
                
                allDescriptions.forEach(desc => {
                    desc.classList.remove('visible');
                    desc.innerHTML = '';
                });
                
                allModelImages.forEach(img => {
                    img.style.opacity = 0;
                    img.src = '';
                });

                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.dispatchEvent(new Event('scroll'));
                updateSummaryText();
                
                // Re-init images after reset
                updateDisplayImages(2);
            });

            window.dispatchEvent(new Event('scroll')); 
            
            bassBackgroundImage.src = IMAGE_BASE_URL + 'bass-background.png';
            clarityBackgroundImage.src = IMAGE_BASE_URL + 'clarity-background.png';
            
            // Force initial update to show default headphone
            updateDisplayImages(2);
        });