import urlConfig from `giftlink-frontend/src/config.js`
import useAppContext from `giftlink-frontend/context/AuthContext.js`
import useNavigate from `react-router-dom`


//Do these tasks inside the RegisterPage function, after the useStates definition
//{{Insert code here}} //Task 4: Include a state for error message.
const [showerr, setShowerr] = useState('');
//{{Insert code here}} //Task 5: Create a local variable for `navigate`   and `setIsLoggedIn`.
const navigate = useNavigate();
const { setIsLoggedIn } = useAppContext();


const handleRegister = async () => {
    try{
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
           metyhod: "POST",
            headers: {'content-type': 'application/json',},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        })

        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);
            setIsLoggedIn(true);
            navigate('/app')
        }
        if (json.error) {
            setShowerr(json.error);
        }
        
    }catch (e) {
        console.log("Error fetching details: " + e.message);
    }
}