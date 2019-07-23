import React from 'react';

function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <ul className="nav nav-pills mr-auto">
          <li className="nav-item">
            {/* <img src={Config.client.logo_url} style={{ maxHeight: '40px' }} /> */}
            Project Blackerry
          </li>
          {/* <li className="nav-item">
            <a
              className={props.currentTab == 'scan' ? 'nav-link active' : 'nav-link'}
              href="#"
              role="button"
              onClick={() => props.handleTabChange('scan')}
            >
              Scan
            </a>
          </li>
          <li className="nav-item ml-2">
            <a
              className={props.currentTab == 'search' ? 'nav-link active' : 'nav-link'}
              href="#"
              role="button"
              onClick={() => props.handleTabChange('search')}
            >
              Search
            </a>
          </li>
          <li className="nav-item">
            <a
              className={props.currentTab == 'schedule' ? 'nav-link active' : 'nav-link'}
              href="#"
              role="button"
              onClick={() => props.handleTabChange('schedule')}
            >
              Schedule
            </a>
          </li> */}
        </ul>
        {/* <Button text="Sign out" onClick={() => Auth.signOut()} /> */}
        {/* <img className="scrollFade" src="../styles/images/topography.png" alt="" /> */}
      </nav>
      {/* <img className="scrollFade" src={ScrollFade} alt="" /> */}
    </>
  );
}

export default Navbar;
