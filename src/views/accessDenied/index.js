import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  routeTo,
} from '../../coreModules/app/actions';
import './styles.scss';

/**
 * AccessDenied
 * @extends Component
 */
function AccessDenied(props) {
  const [count, setCount] = React.useState(10);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(id);
  });

  /**
   * Redirect user to login page
   */
  function goToHomePage() {
    props.actions.routeTo('/');
  }

  // time out then redirect user to homepage
  if (count === -1) {
    goToHomePage();
  }
  return (
    <div id="hdt-access-denied-page" className="text-center">
      <h1>We&apos;re sorry</h1>
      <h2>You do not have permission to access this resource.
        Your access rights might have been changed.</h2>
      <p>
        {'You will be automatically redirected to the '}
        <a
          href="/"
          tabIndex="0"
          role="button"
        >
          {'home '}
        </a>
        {'page in '}
        <span id="countDown" >
          {count}
        </span>
        {' seconds.'}
        <br />
        {'Or '}
        <a
          className="testlink"
          tabIndex="0"
          role="button"
          href="/login"
        >
          {'click here '}
        </a>
        {' to re-login.'}
      </p>
    </div>
  );
}

AccessDenied.propTypes = {
  actions: PropTypes.shape({
    routeTo: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ routeTo }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessDenied);
