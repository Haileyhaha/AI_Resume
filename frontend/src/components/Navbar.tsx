import { SignInButton, UserButton, useClerk, useUser } from '@clerk/clerk-react';
import logo3 from '../assets/logo3.png';
import { 
    NavbarContainer,
    NavbarContent,
    Logo,
    MenuLinks,
    ProfileActions
 } from '../styles/NavbarStyles';

const Navbar: React.FC = () =>{

    const {signOut} = useClerk();
    const {isSignedIn} = useUser();

    return (
        <NavbarContainer>
            <NavbarContent>
                <Logo>
                    <img src={logo3} alt='Logo'/>
                </Logo>
                <MenuLinks>
                    <a href='/home'>Home</a>
                    <a href='/history'>History</a>
                </MenuLinks>
                <ProfileActions>
                    {isSignedIn? (
                        <>
                            <UserButton/>
                            <button onClick={()=> signOut()}>Sign Out</button>
                        </>
                    ) : ( 
                    <SignInButton mode='modal'/>
                    )}
                </ProfileActions>
            </NavbarContent>
        </NavbarContainer>
    )
}

export default Navbar;