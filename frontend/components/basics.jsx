const React = require('react');

const Basics = React.createClass({

  render: function() {
    return (
      <div>
        <div className="project-basic-form">
          <ul>
            <li className="project-image">
              <h3>Project image</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                  <p>Choose an image from your computer</p>
                </div>
              </div>
            </li>
            <li className="project-title">
              <h3>Project title</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                </div>
              </div>
            </li>
            <li className="project-shortBlurb">
              <h3>Short blurb</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                </div>
              </div>
            </li>
            <li className="project-category">
              <h3>Category</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                </div>
              </div>
            </li>
            <li className="project-location">
              <h3>Project location</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                </div>
              </div>
            </li>
            <li className="project-duration">
              <h3>Funding duration</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                </div>
              </div>
            </li>
            <li className="project-goal">
              <h3>Funding goal</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Basics;
