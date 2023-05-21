import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar, ProfileSidebar } from '../components';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  return (
    <div>
      <Navbar />
      {!currentUser ? <div></div> : (
        <div className="pt-20"> {/* Add wrapper div with top padding */}
          <main>
            <ProfileSidebar user={currentUser} />
          </main>
        </div>
      )}
    </div>
  )
}

export default ProfilePage;
