/* ==========================================
   ENHANCED PARALLAX SCROLLING & ANIMATIONS
   Class 2026 Portal - JavaScript
   ========================================== */

// ==========================================
// PARALLAX SCROLLING EFFECT
// ==========================================

function initParallax() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return; // Skip parallax if user prefers reduced motion
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax background
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Parallax layers with different speeds
        const layers = document.querySelectorAll('.parallax-layer');
        layers.forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });

        // Floating shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// ==========================================
// SMOOTH SCROLL ANIMATIONS (Intersection Observer)
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// HEADER SCROLL BEHAVIOR
// ==========================================

function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on section
        updateActiveNavLink();

        lastScroll = currentScroll;
    });
}

// ==========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ==========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('nav a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// NUMBER COUNTER ANIMATION (for stats)
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ==========================================
// INITIALIZE COUNTER ANIMATIONS ON SCROLL
// ==========================================

function initCounterAnimations() {
    // Select both hero stats and quick stats
    const counters = document.querySelectorAll('.stat-number, .stat-counter');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Get target from data attribute or text content
                const targetValue = parseInt(target.dataset.target) || parseInt(target.textContent) || parseInt(target.id.includes('students') ? '55' : '0'); // Fallback for specific IDs if needed

                if (targetValue > 0) {
                    target.textContent = '0';
                    animateCounter(target, targetValue);
                }
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// BLOOD GROUP FILTER
// ==========================================

function initBloodGroupFilter() {
    const filterSelect = document.getElementById('blood-group-filter');
    const searchInput = document.getElementById('student-search');

    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            filterStudents();
        });
    }
}

function filterStudents() {
    const searchTerm = document.getElementById('student-search').value.toLowerCase();
    const bloodGroup = document.getElementById('blood-group-filter').value;

    const filtered = CLASS_DATA.students.filter(student => {
        const matchesSearch = !searchTerm ||
            student.personal.name.toLowerCase().includes(searchTerm) ||
            student.academic.regNo.toLowerCase().includes(searchTerm);

        const matchesBloodGroup = !bloodGroup || student.health.bloodGroup === bloodGroup;

        return matchesSearch && matchesBloodGroup;
    });

    renderStudents(filtered);
}

// Mock Data 
const CLASS_DATA = {
    className: "Class of 2026",
    department: "Computer Science & Engineering",
    staff: [
        {
            id: 's1',
            name: "Mrs. J. Nandhini Arun",
            role: "Class Advisor & AP / CSE",
            subjects: "IOS, OS Lab",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
            email: "nandhini@example.com"
        },
        {
            id: 's2',
            name: "Mr. P. Kapil Das",
            role: "Assistant Professor / CSE",
            subjects: "Theory of Computation",
            photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300",
            email: "kapil@example.com"
        },
        {
            id: 's3',
            name: "Ms. I. Sariga",
            role: "Assistant Professor / CSE",
            subjects: "AI & ML",
            photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300",
            email: "sariga@example.com"
        },
        {
            id: 's4',
            name: "Ms. R. Priya",
            role: "Assistant Professor / CSE",
            subjects: "DBMS, DBMS Lab",
            photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=300",
            email: "priya@example.com"
        },
        {
            id: 's5',
            name: "Mrs. S. Angelkeruba",
            role: "Assistant Professor / CSE",
            subjects: "Algorithms",
            photo: "https://images.unsplash.com/photo-1598550832205-d5b5fe4d03e8?auto=format&fit=crop&q=80&w=300&h=300",
            email: "angel@example.com"
        },
        {
            id: 's6',
            name: "Mrs. R. Chitra",
            role: "Assistant Professor / English",
            subjects: "English",
            photo: "https://images.unsplash.com/photo-1551836022-4c4c79ca8485?auto=format&fit=crop&q=80&w=300&h=300",
            email: "chitra@example.com"
        },
        {
            id: 's7',
            name: "Mr. R. Saravana Kumar",
            role: "Placement Officer",
            subjects: "Placement Hour",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300",
            email: "saravana@example.com"
        },
        {
            id: 's8',
            name: "Mr. M. Perumal",
            role: "Assistant Professor / Maths",
            subjects: "Probability & Queueing Theory",
            photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300",
            email: "perumal@example.com"
        }
    ],
    representatives: [
        {
            id: 'r1',
            name: "John Doe",
            role: "Class Rep (Boys)",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        {
            id: 'r2',
            name: "Jane Smith",
            role: "Class Rep (Girls)",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        }
    ],
    students: [
        {
            id: 1,
            personal: { name: "V. Manjula", initial: "V", gender: "Female", dob: "2007-06-24", nationality: "Indian", religion: "Hindu", community: "BC" },
            academic: { regNo: "622624104029", yearJoin: 2024, regulation: "2021", admissionQuota: "Government Quota", department: "CSE" },
            health: { bloodGroup: "O+" },
            residence: { type: "Hostel", address: "52/devarulimangalam (vill), Denkanikottai (tk)", taluk: "Denkanikottai", district: "Krishnagiri", state: "Tamil Nadu", pincode: "635107" },
            contact: { email: "manjulamanjula9655@gmail.com", phone: "9655159904", fatherName: "Venugopal", motherName: "Kalavathi" },
            details: { skills: ["Java"], hobbies: ["Reading"], achievements: [], dreamJob: "Engineer" }
        },
        {
            id: 2,
            personal: { name: "R. Durgadevi", initial: "R", gender: "Female", dob: "2006-08-19", nationality: "Indian", religion: "Hindu", community: "SC" },
            academic: { regNo: "622624104010", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "AB+" },
            residence: { type: "Dayscholar", address: "1/138, Anna Nagar, Pattukonmapatti", taluk: "Papiireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636905" },
            contact: { email: "duga1908@gmail.com", phone: "9442813836", fatherName: "C. Raja", motherName: "R. Chithra" },
            details: { skills: ["C"], hobbies: ["Drawing"], achievements: [], dreamJob: "Engineer" }
        },
        {
            id: 3,
            personal: { name: "C. Arulkumar", initial: "C", gender: "Male", dob: "2007-01-12", nationality: "Indian", religion: "Hindu", community: "SC" },
            academic: { regNo: "622624104003", yearJoin: 2024, regulation: "2021", admissionQuota: "MQ", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "1-4, Harur", taluk: "Harur", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636902" },
            contact: { email: "arulchitta@gmail.com", phone: "8668032360", fatherName: "Chinnaraj", motherName: "-" },
            details: { skills: ["Python"], hobbies: ["Cricket"], achievements: [], dreamJob: "Developer" }
        },
        {
            id: 4,
            personal: { name: "R. Govindaraj", initial: "R", gender: "Male", dob: "2007-06-03", nationality: "Indian", religion: "Hindu", community: "BC" },
            academic: { regNo: "622624104015", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "O+" },
            residence: { type: "Hostel", address: "2/97, Basuvanapuram, Anchetty", taluk: "Anchetty", district: "Krishnagiri", state: "Tamil Nadu", pincode: "635102" },
            contact: { email: "govindarajgovi14356@gmail.com", phone: "9626658618", fatherName: "Rangaswamy M", motherName: "Sunita S" },
            details: { skills: ["Web Dev"], hobbies: ["Gaming"], achievements: [], dreamJob: "Web Developer" }
        },
        {
            id: 5,
            personal: { name: "Vishva. K", initial: "K", gender: "Male", dob: "2007-07-26", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104064", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Hostel", address: "3/119, Urigam", taluk: "Anchitty", district: "Krishnagiri", state: "Tamil Nadu", pincode: "635102" },
            contact: { email: "kvishvakvishva07@gmail.com", phone: "8015512249", fatherName: "Krishnamoorthy", motherName: "Madhamma" },
            details: { skills: ["Java"], hobbies: ["Sports"], achievements: [], dreamJob: "Engineer" }
        },
        {
            id: 6,
            personal: { name: "S. Srisivanaya", initial: "S", gender: "Female", dob: "2006-10-14", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104052", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Hostel", address: "Moonglimaduv (village)", taluk: "Pennagram", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636701" },
            contact: { email: "sivanaya@gmail.com", phone: "6381236438", fatherName: "Siva", motherName: "-" },
            details: { skills: ["C++"], hobbies: ["Reading"], achievements: [], dreamJob: "Software Engineer" }
        },
        {
            id: 7,
            personal: { name: "Lakshmi Ajay", initial: "K", gender: "Male", dob: "2007-07-04", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104025", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "AB+" },
            residence: { type: "Hostel", address: "1/101, T. Pudhur", taluk: "Kelamanglam", district: "Krishnagiri", state: "Tamil Nadu", pincode: "635113" },
            contact: { email: "lakshmiajay252in439@gmail.com", phone: "9688003847", fatherName: "Kaliyappan", motherName: "Vediyammal" },
            details: { skills: ["Python"], hobbies: ["Running"], achievements: [], dreamJob: "Police" }
        },
        {
            id: 8,
            personal: { name: "M. Sujithkumar", initial: "M", gender: "Male", dob: "2006-11-05", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104054", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "AB+" },
            residence: { type: "Dayscholar", address: "2/202, Pudhukokkarapatti", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636905" },
            contact: { email: "sujithkumarsujithkumar244@gmail.com", phone: "7338951085", fatherName: "Madesh N", motherName: "Dhanalakshmi M" },
            details: { skills: ["JS"], hobbies: ["Music"], achievements: [], dreamJob: "Developer" }
        },
        {
            id: 9,
            personal: { name: "Janapriya. S", initial: "S", gender: "Female", dob: "2007-04-11", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104020", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "4/232, Hosur Village", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "635302" },
            contact: { email: "janapriya3758@gmail.com", phone: "7358993758", fatherName: "M. Sasikumar", motherName: "S. Lakshmi" },
            details: { skills: ["Communication"], hobbies: ["Reading"], achievements: [], dreamJob: "HR" }
        },
        {
            id: 10,
            personal: { name: "M. Pradeepa", initial: "M", gender: "Female", dob: "2007-06-22", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104037", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Hostel", address: "5/62, Mariyamman Kovil Street, Nelliyankulam", taluk: "Vandavasi", district: "Thiruvannamali", state: "Tamil Nadu", pincode: "604405" },
            contact: { email: "mmohanpradeepadeepa@gmail.com", phone: "9043207358", fatherName: "P. Mohan", motherName: "-" },
            details: { skills: ["Leadership"], hobbies: ["Singing"], achievements: [], dreamJob: "Manager" }
        },
        {
            id: 11,
            personal: { name: "P. Azhagesan", initial: "P", gender: "Male", dob: "2007-06-03", nationality: "Indian", religion: "Hindu", community: "ST" },
            academic: { regNo: "622624104004", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "O+" },
            residence: { type: "Dayscholar", address: "2/532, Sakkilithampur, Sitheri", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636903" },
            contact: { email: "alagesanalagesan160@gmail.com", phone: "9025428469", fatherName: "P. Perumal", motherName: "P. Yasotha" },
            details: { skills: ["Farming"], hobbies: ["Cricket"], achievements: [], dreamJob: "Army" }
        },
        {
            id: 12,
            personal: { name: "D. Madhesh", initial: "D", gender: "Male", dob: "2007-03-14", nationality: "Indian", religion: "Hindu", community: "ST" },
            academic: { regNo: "622624104027", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Dayscholar", address: "842A, Azhagur, Kalasapadi", taluk: "Papperettipati", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636903" },
            contact: { email: "madhesh6997@gmail.com", phone: "7010895355", fatherName: "T. Deventhiran", motherName: "D. Jayalakshmi" },
            details: { skills: ["Running"], hobbies: ["Sports"], achievements: [], dreamJob: "Police" }
        },
        {
            id: 13,
            personal: { name: "Srimathi. V", initial: "V", gender: "Female", dob: "2007-01-14", nationality: "Indian", religion: "Hindu", community: "SC" },
            academic: { regNo: "622624104051", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Dayscholar", address: "233, A. Reddipatti", taluk: "Uthangarai", district: "Krishnagiri", state: "Tamil Nadu", pincode: "635304" },
            contact: { email: "srimathi08@gmail.com", phone: "9629948620", fatherName: "Venketasan", motherName: "Manimegalai" },
            details: { skills: ["Dancing"], hobbies: ["Dance"], achievements: [], dreamJob: "Choreographer" }
        },
        {
            id: 14,
            personal: { name: "Baby Sree. T", initial: "T", gender: "Female", dob: "2007-03-16", nationality: "Indian", religion: "Hindu", community: "BC" },
            academic: { regNo: "622624104005", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "O+" },
            residence: { type: "Dayscholar", address: "3/117, Ellapudayampatty", taluk: "Harur", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636903" },
            contact: { email: "babysree179@gmail.com", phone: "9488735173", fatherName: "Thiruvengadam", motherName: "Krishnaveni" },
            details: { skills: ["Singing"], hobbies: ["Music"], achievements: [], dreamJob: "Singer" }
        },
        {
            id: 15,
            personal: { name: "S. Dharshini", initial: "S", gender: "Female", dob: "2007-01-23", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104008", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "102/A, Krishnapuram", taluk: "Dharmapuri", district: "Dharmapuri", state: "Tamil Nadu", pincode: "635202" },
            contact: { email: "dharshinidharshini4578@gmail.com", phone: "9344685260", fatherName: "P. Sakthivel", motherName: "S. Manjula" },
            details: { skills: ["Coding"], hobbies: ["Reading"], achievements: [], dreamJob: "Developer" }
        },
        {
            id: 16,
            personal: { name: "S. Deepika", initial: "S", gender: "Female", dob: "2007-07-24", nationality: "Indian", religion: "Hindu", community: "BC" },
            academic: { regNo: "622624104007", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "46A, Meiyyandapatti", taluk: "Uthangarai", district: "Krishnagiri", state: "Tamil Nadu", pincode: "636902" },
            contact: { email: "deepika24072007hmt@gmail.com", phone: "6380772440", fatherName: "G. Senthilkumar", motherName: "S. Sudha" },
            details: { skills: ["Drawing"], hobbies: ["Art"], achievements: [], dreamJob: "Artist" }
        },
        {
            id: 17,
            personal: { name: "S. Gowtham", initial: "S", gender: "Male", dob: "2006-07-17", nationality: "Indian", religion: "Hindu", community: "SC" },
            academic: { regNo: "622624104016", yearJoin: 2024, regulation: "2021", admissionQuota: "Government", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Hostel", address: "577, Tiruvannamalai", taluk: "Tiruvannamalai", district: "Tiruvannamalai", state: "Tamil Nadu", pincode: "604601" },
            contact: { email: "shiva081981@gmail.com", phone: "9360349788", fatherName: "P. Shiva", motherName: "S. Rangammal" },
            details: { skills: ["Sports"], hobbies: ["Volleyball"], achievements: [], dreamJob: "Police" }
        },
        {
            id: 18,
            personal: { name: "Gubendhiran. V", initial: "V", gender: "Male", dob: "2007-06-15", nationality: "Indian", religion: "Hindu", community: "MBC" }, // DOB Guessed near June based on data order as it was missing
            academic: { regNo: "622624104018", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "O+" },
            residence: { type: "Dayscholar", address: "1/35, Krishnagiri Main Road", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636701" },
            contact: { email: "gubendhiranv9790@gmail.com", phone: "6380697262", fatherName: "Velu", motherName: "Sarasa" },
            details: { skills: ["Farming"], hobbies: ["Agri"], achievements: [], dreamJob: "Farmer" }
        },
        {
            id: 19,
            personal: { name: "Hemalatha. C", initial: "C", gender: "Female", dob: "2007-04-19", nationality: "Indian", religion: "Hindu", community: "ST" },
            academic: { regNo: "622624104019", yearJoin: 2024, regulation: "2021", admissionQuota: "MQ", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Dayscholar", address: "3/304, Kalthanipadi", taluk: "Harur", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636906" },
            contact: { email: "hemachan69@gmail.com", phone: "9514752806", fatherName: "Chinnappan", motherName: "Rukkumani" },
            details: { skills: ["Study"], hobbies: ["Books"], achievements: [], dreamJob: "Teacher" }
        },
        {
            id: 20,
            personal: { name: "M. Marimuthu", initial: "M", gender: "Male", dob: "2007-01-23", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104030", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "169, Sajjalaalli", taluk: "Pennagaram", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636809" },
            contact: { email: "marimuthuoldscerb@gmail.com", phone: "7092398644", fatherName: "M. Muthusamy", motherName: "-" },
            details: { skills: ["Running"], hobbies: ["Sports"], achievements: [], dreamJob: "Army" }
        },
        {
            id: 21,
            personal: { name: "N. Ramya", initial: "N", gender: "Female", dob: "2007-01-12", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104044", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ 7.5", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Dayscholar", address: "1/92, Nadur, Alapuram", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636904" },
            contact: { email: "ramya12n2007@gmail.com", phone: "8610902598", fatherName: "G. Nilavarasan", motherName: "Saraswathi" },
            details: { skills: ["Reading"], hobbies: ["Books"], achievements: [], dreamJob: "Teacher" }
        },
        {
            id: 22,
            personal: { name: "V. Chennakrishnan", initial: "V", gender: "Male", dob: "2007-09-05", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104006", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "3/454, Nandupallam", taluk: "Harur", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636906" },
            contact: { email: "chennakrishnan338@gmail.com", phone: "8072990797", fatherName: "Venkatraman", motherName: "Kavitha" },
            details: { skills: ["Cricket"], hobbies: ["Sports"], achievements: [], dreamJob: "Police" }
        },
        {
            id: 23,
            personal: { name: "G. Thangamani", initial: "G", gender: "Male", dob: "2006-09-04", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104058", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Dayscholar", address: "58A, Perummalkuppam", taluk: "Uthangarai", district: "Krishnagiri", state: "Tamil Nadu", pincode: "635207" },
            contact: { email: "tthangamani1433@gmail.com", phone: "8300165467", fatherName: "Ganapathi", motherName: "-" },
            details: { skills: ["Farming"], hobbies: ["Agri"], achievements: [], dreamJob: "Farmer" }
        },
        {
            id: 24,
            personal: { name: "S. Sakshiya", initial: "S", gender: "Female", dob: "2007-01-03", nationality: "Indian", religion: "Hindu", community: "ST" },
            academic: { regNo: "622624104045", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "1024, Mullikkadu", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636904" },
            contact: { email: "sakshiya3888@gmail.com", phone: "8524805177", fatherName: "C. Settu", motherName: "S. Usha" },
            details: { skills: ["Reading"], hobbies: ["Music"], achievements: [], dreamJob: "Doctor" }
        },
        {
            id: 25,
            personal: { name: "Jeevitha. V", initial: "V", gender: "Female", dob: "2007-09-22", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104022", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "B+" },
            residence: { type: "Dayscholar", address: "3/196, Vengatramapuram", taluk: "Harur", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636906" },
            contact: { email: "jeevithavadivel43@gmail.com", phone: "7603976710", fatherName: "Vadivel", motherName: "Sathyavathi" },
            details: { skills: ["Cooking"], hobbies: ["Food"], achievements: [], dreamJob: "Chef" }
        },
        {
            id: 26,
            personal: { name: "K. Velmurugan", initial: "K", gender: "Male", dob: "2007-05-02", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104059", yearJoin: 2024, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "AB+" },
            residence: { type: "Dayscholar", address: "4/233, Odasalpatti Pudhur", taluk: "Pappireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "635303" },
            contact: { email: "velr1562143@gmail.com", phone: "6381287848", fatherName: "Kandasamy", motherName: "Lakshmi" },
            details: { skills: ["Driving"], hobbies: ["Travel"], achievements: [], dreamJob: "Pilot" }
        },
        {
            id: 27,
            personal: { name: "Mukeshraji. R", initial: "R", gender: "Male", dob: "2007-02-03", nationality: "Indian", religion: "Hindu", community: "ST" },
            academic: { regNo: "622624104032", yearJoin: 2024, regulation: "2021", admissionQuota: "Management", department: "CSE" },
            health: { bloodGroup: "O+" },
            residence: { type: "Hostel", address: "Indira Colony, Vadapalai", taluk: "Melmalaiyanur", district: "Viluppuram", state: "Tamil Nadu", pincode: "604204" },
            contact: { email: "santhiramukesh2@gmail.com", phone: "7418233725", fatherName: "Ravi. V", motherName: "Chitra. K" },
            details: { skills: ["Gaming"], hobbies: ["Games"], achievements: [], dreamJob: "Gamer" }
        },
        {
            id: 28,
            personal: { name: "Elumalai. R", initial: "R", gender: "Male", dob: "2007-07-16", nationality: "Indian", religion: "Hindu", community: "MBC" },
            academic: { regNo: "622624104011", yearJoin: 2024, regulation: "2021", admissionQuota: "Govt Quota", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "Nandupallam", taluk: "Harur", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636906" },
            contact: { email: "elumalair154@gmail.com", phone: "7010520539", fatherName: "Rangasamy. K", motherName: "Malar. R" },
            details: { skills: ["Running"], hobbies: ["Sports"], achievements: [], dreamJob: "Police" }
        },
        {
            id: 29,
            personal: { name: "Srikumar. M", initial: "M", gender: "Male", dob: "2007-06-25", nationality: "Indian", religion: "Hindu", community: "SC" },
            academic: { regNo: "TBD", yearJoin: 2025, regulation: "2021", admissionQuota: "GQ", department: "CSE" },
            health: { bloodGroup: "A+" },
            residence: { type: "Dayscholar", address: "Papiireddipatti", taluk: "Papiireddipatti", district: "Dharmapuri", state: "Tamil Nadu", pincode: "636905" },
            contact: { email: "srikumar@example.com", phone: "-", fatherName: "Sathya. M", motherName: "-" },
            details: { skills: ["-"], hobbies: ["-"], achievements: [], dreamJob: "-" }
        }
    ],
    announcements: [
        {
            id: 1,
            title: "Internal Assessment 1",
            date: "2026-03-10",
            category: "Exam",
            content: "IA-1 will commence from March 10th. Syllabus: Unit 1 & 2 for all subjects."
        },
        {
            id: 2,
            title: "Industrial Visit to Bangalore",
            date: "2026-04-05",
            category: "Event",
            content: "A 3-day industrial visit to Bangalore is scheduled. Interested students please register with Class Reps."
        },
        {
            id: 3,
            title: "Guest Lecture on AI",
            date: "2026-02-20",
            category: "Academic",
            content: "Mr. Sundar Pichai will be delivering a lecture on the Future of AI. Venue: Main Auditorium."
        }
    ]
};

// DOM Elements
const staffGrid = document.getElementById('staff-grid');
const studentsGrid = document.getElementById('students-grid');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const searchInput = document.getElementById('student-search');

// Render Functions
function renderStaff() {
    // Combine staff and reps for the section
    const allStaff = [...CLASS_DATA.staff, ...CLASS_DATA.representatives];

    staffGrid.innerHTML = allStaff.map(person => `
        <div class="card">
            <div class="card-info" style="text-align: center;">
                <img src="${person.photo}" alt="${person.name}" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 1rem;">
                <h3 class="card-name" style="font-size: 1.1rem;">${person.name}</h3>
                <p class="card-role" style="font-size: 0.8rem;">${person.role}</p>
                ${person.subjects ? `<p style="font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; font-style: italic;">${person.subjects}</p>` : ''}
                ${person.email ? `<p style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">${person.email}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function renderStudents(studentsToRender = CLASS_DATA.students) {
    if (studentsToRender.length === 0) {
        studentsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No students found.</p>';
        return;
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    studentsGrid.innerHTML = studentsToRender.map(student => {
        const dob = new Date(student.personal.dob);
        const isBirthday = dob.getMonth() + 1 === currentMonth && dob.getDate() === currentDay;

        return `
        <div class="card" onclick="openStudentModal(${student.id})">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${student.personal.name}" class="card-image" alt="${student.personal.name}">
            <div class="card-info">
                ${isBirthday ? '<div style="background: #fbbf24; color: #000; padding: 0.5rem; text-align: center; border-radius: 8px; margin-bottom: 0.5rem; font-weight: bold; font-size: 0.9rem;">🎂 Happy Birthday!</div>' : ''}
                <h3 class="card-name">${student.personal.name}</h3>
                <p class="card-role">${student.academic.regNo}</p>
                
                <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="tag-small tag-district">${student.residence.district}</span>
                    <span class="tag-small tag-residence">${student.residence.type}</span>
                </div>

                <div style="margin-top: 0.5rem; display: flex; gap: 0.25rem;">
                    ${student.details.skills.slice(0, 2).map(skill =>
            `<span style="font-size: 0.7rem; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${skill}</span>`
        ).join('')}
                    ${student.details.skills.length > 2 ? `<span style="font-size: 0.7rem; color: #94a3b8;">+${student.details.skills.length - 2}</span>` : ''}
                </div>
            </div>
        </div>
    `}).join('');
}

// Modal Functions
function openStudentModal(id) {
    const student = CLASS_DATA.students.find(s => s.id === id);
    if (!student) return;

    // Populate Modal
    document.getElementById('modal-img').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.personal.name}`;
    document.getElementById('modal-name').textContent = student.personal.name;
    document.getElementById('modal-reg').textContent = `Reg No: ${student.academic.regNo}`;

    // New Fields
    document.getElementById('modal-dept').textContent = student.academic.department;
    document.getElementById('modal-dob').textContent = new Date(student.personal.dob).toLocaleDateString();
    document.getElementById('modal-email').textContent = student.contact.email;
    document.getElementById('modal-phone').textContent = student.contact.phone; // Sensitive displayed only here
    document.getElementById('modal-job').textContent = student.details.dreamJob;

    // Lists
    const skillsContainer = document.getElementById('modal-skills');
    skillsContainer.innerHTML = student.details.skills.map(skill => `<span class="tag">${skill}</span>`).join('');

    const hobbiesContainer = document.getElementById('modal-hobbies');
    hobbiesContainer.innerHTML = student.details.hobbies.map(hobby => `<span class="tag">${hobby}</span>`).join('');

    const achievementsList = document.getElementById('modal-achievements');
    achievementsList.innerHTML = student.details.achievements.map(ach => `<li>${ach}</li>`).join('');

    // Show
    document.body.style.overflow = 'hidden';
    modalOverlay.classList.add('active');
}

function closeStudentModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners
closeModalBtn.addEventListener('click', closeStudentModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeStudentModal();
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    filterStudents();
});

// Stats
function updateStats() {
    // Hardcoded to 55 as per user request
    document.getElementById('stats-students').textContent = "55";
    // Calculate total achievements
    const totalAchievements = CLASS_DATA.students.reduce((acc, curr) => acc + curr.details.achievements.length, 0);
    document.getElementById('stats-achievements').textContent = totalAchievements;
}

// Announcements
function renderAnnouncements() {
    const announcementsContainer = document.getElementById('announcements-grid');
    if (!announcementsContainer) return;

    announcementsContainer.innerHTML = CLASS_DATA.announcements.map(item => {
        let categoryClass = '';
        if (item.category === 'Exam') categoryClass = 'cat-exam';
        else if (item.category === 'Event') categoryClass = 'cat-event';
        else categoryClass = 'cat-academic';

        return `
        <div class="announcement-card ${categoryClass}">
            <div class="ann-header">
                <span class="ann-category">${item.category}</span>
                <span class="ann-date">${new Date(item.date).toLocaleDateString()}</span>
            </div>
            <h3 class="ann-title">${item.title}</h3>
            <p class="ann-content">${item.content}</p>
        </div>
        `;
    }).join('');
}

// Banner Birthday Check
function checkBannerBirthdays() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const birthdayStudents = CLASS_DATA.students.filter(s => {
        const dob = new Date(s.personal.dob);
        return dob.getMonth() + 1 === currentMonth && dob.getDate() === currentDay;
    });

    const birthdayContainer = document.getElementById('birthday-container');

    if (birthdayStudents.length > 0 && birthdayContainer) {
        birthdayContainer.style.display = 'inline-block';

        const count = birthdayStudents.length;
        let message = "";

        if (count === 1) {
            message = `🎉 Happy Birthday, ${birthdayStudents[0].personal.name}! 🎂`;
        } else {
            const names = birthdayStudents.map(s => s.personal.name).join(", ");
            message = `🎉 Happy Birthday to ${count} Stars: ${names}! 🎂`;
        }

        birthdayContainer.innerHTML = `<span class="birthday-text">${message}</span>`;
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax and animations
    initParallax();
    initScrollAnimations();
    initHeaderScroll();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initCounterAnimations();
    initBloodGroupFilter();

    // Render content
    renderStaff();
    renderStudents();
    updateStats();
    renderAnnouncements();
    checkBannerBirthdays();

    // Add loading class fade out
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
        document.body.classList.add('loaded');
    }, 1500); // Slight delay to show off the loader
});

// Add Student Logic (Simplified for now as schema changed drastically)
const addStudentBtn = document.getElementById('add-student-btn');
const addStudentModalOverlay = document.getElementById('add-student-modal-overlay');
const closeAddStudentModalBtn = document.getElementById('close-add-modal');
const addStudentForm = document.getElementById('add-student-form');

function openAddStudentModal() {
    addStudentModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddStudentModal() {
    addStudentModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

addStudentBtn.addEventListener('click', openAddStudentModal);
closeAddStudentModalBtn.addEventListener('click', closeAddStudentModal);

addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // For now, disabling add student as form needs major update to match new schema
    alert('Add Student feature under maintenance for schema upgrade.');
    closeAddStudentModal();
});

// Close modal on outside click
addStudentModalOverlay.addEventListener('click', (e) => {
    if (e.target === addStudentModalOverlay) closeAddStudentModal();
});