import logo from "../assets/logo.svg"

export function  Footer() 
{
    return(        
        <footer className="footer sm:footer-horizontal bg-blue-800 text-neutral-content items-center p-4 flex justify-center">
            <aside  className="flex  items-center">
                <img src={logo} alt="Site logo" className="size-15"/>
                <p>© 2026 - Task Tracker Lite</p>
            </aside>
        </footer>
    );
}