import React from 'react';

// import { userService } from '@/_services';

class ResearcherPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount() {
    // userService.getAll().then((users) => this.setState({ users }));
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>Researcher</h1>
        <p>This page can only be accessed by Researchers.</p>
        <div>
          All users from secure (Researcher only) api end point:
          {users && (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default ResearcherPage;
