import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  section: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    flexGrow: 0,
    border: 0.25
  },
  sectionJobPostings: {
    flexGrow: 0,
    borderBottom: 0.25,
    paddingBottom: 5,
    paddingTop: 5
  },
  sectionBio: {
    flexGrow: 0,
    borderBottom: 0.25,
    paddingBottom: 5
  },
  sectionDo: {
    flexGrow: 0,
    paddingTop: 5,
    paddingBottom: 5
  },
  sectionTop: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    flexGrow: 0,
    border: 0.25

    // display: 'flex',
    // justifyContent: 'space-between'
  },
  profileTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  industry: {
    fontSize: 15
  },
  address: {
    fontSize: 12
  },
  website: {
    fontSize: 12
  },
  descriptionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: 5
  },
  description: {
    fontSize: 12,
    marginBottom: 5
  },
  founderHeader: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  founder: {
    fontSize: 12
  },
  jobPostedBy: {
    fontSize: 6,
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  image: {
    width: 80,
    height: 80
  }
});

// Create Document Component
class CompanyProfilePDF extends React.Component {
  render() {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.sectionTop}>
            {/* <View> */}
            <Text style={styles.companyName}>{this.props.company.name}</Text>
            <Text style={styles.industry}>{this.props.company.industry}</Text>
            <Text style={styles.address}>{this.props.company.address}</Text>
            <Text style={styles.website}>{this.props.company.website}</Text>
            {/* </View> */}
            {/* <View>
              <Image
                style={styles.image}
                src='https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CompanyLogo%2Fdbd9888d-4da3-4e74-b6c0-8b5df5cc0c68?alt=media&token=e988a036-5ff5-41b0-a5a0-94a4d89fecab'
              />
            </View> */}
          </View>
          <View style={styles.section}>
            <View style={styles.sectionBio}>
              <Text style={styles.descriptionHeader}>Company Description</Text>
              <Text style={styles.description}>
                {this.props.company.description}
              </Text>
              <Text style={{ fontSize: 12 }}>
                Company Founder : {this.props.company.founder}
              </Text>

              <Text style={{ fontSize: 12 }}>
                <Text style={{ fontWeight: 'bold' }}>Company Size :</Text>{' '}
                {this.props.company.size}
              </Text>
            </View>
            <View style={styles.sectionDo}>
              <Text style={styles.descriptionHeader}>What we do:</Text>
              <Text style={styles.description}>{this.props.company.do}</Text>
            </View>
          </View>

          <View style={styles.section}>
            {this.props.company.jobPostings
              ? this.props.company.jobPostings.map(job => (
                  <React.Fragment>
                    <View style={styles.sectionJobPostings}>
                      <Text style={styles.industry}>{job.title}</Text>
                      <Text style={styles.address}>Location: {job.place}</Text>
                      <Text style={styles.description}>
                        Description: {job.description}
                      </Text>
                      <Text style={styles.description}>
                        Required Skills:{' '}
                        {job.skills
                          ? job.skills.map(skill => skill + ',')
                          : null}
                      </Text>
                      <Text style={styles.jobPostedBy}>
                        Posted by- {job.createdByName}
                      </Text>
                    </View>
                  </React.Fragment>
                ))
              : null}
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  }
}
export default CompanyProfilePDF;

// CompanyProfilePDF.propTypes = {
//   company: PropTypes.object
// };
// const mapStateToProps = state => ({
//   company: state.company.company
// });

// export default connect(
//   mapStateToProps,
//   {}
// )(CompanyProfilePDF);
