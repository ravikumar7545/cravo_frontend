import React, {useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './scss/navbar.scss';
import {motion } from  'framer-motion';
import { toast } from 'react-hot-toast';
import{ usePizzaContext } from './PizzaContext';
import SearchBox from './components/SearchBox';


const Navbar = () => {
  const [isTop,setIsTop] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);

  const { user,setUser,cart,setCart,setIsCheckoutDisplay } = usePizzaContext();
  const fullname = user.fullName;
  const navigate = useNavigate();

  const logOutUser = ()=>{
    localStorage.removeItem('foody_token');
    setUser((prevState )=> ({...prevState, username: ''}));
    setCart([]);
    toast.success('Logout successfull')
    navigate('/');
  }

  useEffect(() => {
    
    const scrollHandler = ()=>{
      window.scrollY>10 ? setIsTop(false):setIsTop(true);
    } 
    window.addEventListener('scroll',scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [])
  

  return (
    <header className={isTop? "navbar":'navbar navbar-scrolled'}>
      <p id="navbar-logo" onClick={()=> navigate('/')}>
        C<span>ra</span>vo
      </p>

      <SearchBox/>

      <div className="navbar-features">
        <div className='navbar-cart-icon'>
        <img onClick={() => {
          if(user.username===''){
            toast.error('User need to login')
          }else{         
            setIsCheckoutDisplay(true)}} 
          }
          src={require('./images/cart.png')} alt="cart" />
          <p id="cart-count">{cart?.length===0 ? 0 : cart?.length}</p>
        </div>

        {user.username === '' || user.username ===undefined ? (
          <button>
            <Link to="/login">Sign In</Link>
          </button>
        ) : (
                
            <div id="fullname" 
            onMouseEnter={() => setOpenProfile(true)} 
            onMouseLeave={() => setOpenProfile(false)}
            onLoad={()=>setOpenProfile(false)}
            >
            {fullname?.split(' ')[0].charAt(0).toUpperCase()+fullname?.split(' ')[0].slice(1,4)}
            {
              openProfile?  <div id="profile">
              <motion.p 
              key={1}
              initial={{y:-40}} 
              whileHover={{ scale: 1.2 }}
              whileTap={{scale:0.9}}
              animate={{y:0}}
              >Profile</motion.p>

              <motion.p 
              key={2}
              initial={{y:-70}}
              animate={{y:0,opacity:1}}
              whileHover={{ scale: 1.2 }}
              whileTap={{scale:0.9}} 
              transition={{ delay: 0.05 }}>Orders</motion.p>

              <motion.p 
              key={3}
              initial={{y:-100,opacity:0}}
              animate={{y:0,opacity:1}} 
              whileHover={{ scale: 1.2 }}
              whileTap={{scale:0.9}}
              transition={{delay: 0.05 }} onClick={()=>{logOutUser();setOpenProfile(false)}}>Logout</motion.p>
            </div>:""
            }
             
            </div>
          
        )}
      </div>
    </header>
  );
};

export default Navbar;
