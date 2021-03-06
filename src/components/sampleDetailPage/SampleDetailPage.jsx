import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'react-flexbox-grid';
import { Icon } from 'carbon-components-react';
import axios from 'axios';
import { GoMarkGithub } from 'react-icons/lib/go';
import './SampleDetailPage.css';

class SampleDetailPage extends Component {
  constructor(params) {
    super(params);
    this.state = {
      readmeData: '',
    };
    this.getReadmeData = this.getReadmeData.bind(this);
    this.openGithubUrl = this.openGithubUrl.bind(this);
  }
  componentDidMount() {
    this.getReadmeData();
  }

  getReadmeData() {
    axios.get(this.props.sample.readmeLink)
      .then((response) => {
        console.log('got data');
        this.setState({
          readmeData: response.data,
        });
      })
      .catch((err) => {
        console.log('got error');
      });
  }


  openGithubUrl(e, url) {
    e.preventDefault();
    window.open(url, '_blank');
    window.close();
    return false;
  }

  render() {
    return (
      <div className="sample-detail-page standard-padding">
        <Row middle="xs" >
          <Col xs={2} md={1} className="back-icon" onClick={() => this.props.cancel()}>
            <Icon name="arrow--left" />
          </Col>
          <Col xs={11}>
            <h2>IBM Cloud App Launch</h2>
          </Col>
        </Row>
        <Row>
          <Col className="github">
            <GoMarkGithub
              size={48}
              color="#006eb0"
              onClick={e => this.openGithubUrl(e, this.props.sample.githubLink)}
            />
            <p
              style={{ color: '#006eb0', pointer: 'cursor' }}
              onClick={e => this.openGithubUrl(e, this.props.sample.githubLink)}
            >Get Source
            </p>
          </Col>
        </Row>

        <div id="markdown" >
          <div className="markdown-body">
            <ReactMarkdown
              source={this.state.readmeData}
              escapeHtml={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SampleDetailPage;
