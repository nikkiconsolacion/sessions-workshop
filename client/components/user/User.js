import React from 'react';

class User extends React.Component {
  state = {
    isLoggedIn: true
  };

  render() {
    return (
      <div>
        <h4>Welcome</h4>
        {isLoggedIn ? (
          <div>
            <p>Congrats you're logged in...</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default User;
