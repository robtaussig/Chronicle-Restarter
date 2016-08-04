const React = require('react');

const Basics = React.createClass({

  getInitialState () {
    return ({
      image: {},
      title: "",
      blurb: "",
      category: "",
      location: "",
      duration: 0,
      goal: 0,
      saved: false
    });
  },

  componentDidMount () {
    this._setPrefilledData();
  },

  componentWillUnmount () {

  },

  _onChange () {

  },

  _setTitle () {

  },

  _setImage () {

  },

  _setBlurb () {

  },

  _setCategory () {

  },

  _setLocation () {

  },

  _setDuration () {

  },

  _setDurationRadio () {

  },

  _setGoal () {

  },

  _setPrefilledData () {
    this.setState(this.props.data);
  },

  _savechange () {
    this.props.onSave(this.state);
  },

  render: function() {
    let rows = 3;
    return (
      <div className="wrapper">
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
                  <input type="text" className="title"
                    onChange={this._setTitle} placeholder={this.state.title}/>
                </div>
              </div>
            </li>
            <li className="project-shortBlurb">
              <h3>Short blurb</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                  <textarea rows="3" wrap="hard" className="short-blurb-field"
                    onChange={this._setBlurb} />
                </div>
              </div>
            </li>
            <li className="project-category">
              <h3>Category</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                  <button className="category-button"
                    onClick={this._setCategory}>{this.state.category}</button>
                </div>
              </div>
            </li>
            <li className="project-location">
              <h3>Project location</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                  <input type="text" className="location"
                    onChange={this._setLocation}
                    placeholder={this.state.location}/>
                </div>
              </div>
            </li>
            <li className="project-duration">
              <h3>Funding duration</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                  <div className="num-days">
                    <ul>
                      <li>
                        <input name="duration" onClick={this._setDurationRadio}
                          type="radio"/>
                      </li>
                      <li>
                        <input className="duration-field" type="text"
                          onChange={this._setDuration} />
                      </li>
                    </ul>
                  </div>
                  <div className="end-date-calendar">
                    <ul>
                      <li>
                        <input name="duration" onClick={this._openCalendar}
                          type="radio"/>
                      </li>
                      <li>
                        <div>Calendar here</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="project-goal">
              <h3>Funding goal</h3>
              <div className="grey-field">
                <div className="field-wrapper">
                  <input type="text" className="goal"
                    onChange={this._setGoal}
                    placeholder="$0 USD"/>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
        </div>
      </div>
    );
  }

});

module.exports = Basics;
