import AdminScreen from "./adminScreen";
export default function Profile () {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ textAlign: 'center' }}>
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F54%2F72%2Fd1%2F5472d1b09d3d724228109d381d617326.jpg&f=1&nofb=1&ipt=28bcfea4eca893269b884002985588d9421a1ff31334244f71802c3e71b3758c"
                    alt="Profile"
                    style={{ width:"50px", borderRadius: '50%', marginBottom: '1rem' }}
                />
            </div>
            <h1 style={{ textAlign: 'center' }}>John Doe</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
                Web Developer | Tech Enthusiast
            </p>
            <div>
                <p>
                    Hello, I'm John Doe, and this is a dummy profile page created for demonstration purposes.
                    I am passionate about building scalable web applications and exploring the latest web technologies.
                </p>
                <AdminScreen/>
            </div>
        </div>
    );
};

