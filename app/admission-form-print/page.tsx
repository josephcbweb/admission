import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 8,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 4,
  },
  collegeName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  formTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  pageInfo: {
    fontSize: 7,
    textAlign: "right",
    marginBottom: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 4,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 14,
  },
  tableCell: {
    padding: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 7,
  },
  tableCellHeader: {
    padding: 2,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    fontWeight: "bold",
    fontSize: 7,
  },
  photoBox: {
    width: 65,
    height: 85,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 7,
  },
  officeUseContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  officeUseTable: {
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 8,
  },
  declaration: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 7,
    lineHeight: 1.2,
  },
  signatureLine: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: 140,
  },
  remarksBox: {
    height: 18,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 3,
  },
  // Cell width definitions
  cellFull: { width: "100%" },
  cellHalf: { width: "50%" },
  cellThird: { width: "33.33%" },
  cellQuarter: { width: "25%" },
  cellFifth: { width: "20%" },
  cellSixth: { width: "16.66%" },
  // Compact styles
  compactTable: {
    marginBottom: 3,
  },
  compactRow: {
    minHeight: 12,
  },
  compactCell: {
    padding: 1,
    fontSize: 6.5,
  },
  compactHeader: {
    padding: 1,
    fontSize: 6.5,
  },
});

const AdmissionFormPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.collegeName}>COLLEGE OF ENGINEERING CHERTHALA</Text>
        <Text style={styles.formTitle}>ADMISSION FORM 2025-26 (Lateral)</Text>
        <Text>Date: 7/2/2025 10:23:26</Text>
        <Text style={styles.pageInfo}>C1/202/2025-26/CEC/ PAGE 1 of 1</Text>
      </View>

      <View style={styles.divider} />

      {/* For Office Use Only Section */}
      <View style={styles.officeUseContainer}>
        <View style={styles.officeUseTable}>
          <Text style={styles.boldText}>For Office Use Only</Text>
          <View style={[styles.table, styles.compactTable]}>
            <View style={[styles.tableRow, styles.compactRow]}>
              <View
                style={[
                  styles.tableCellHeader,
                  styles.cellHalf,
                  styles.compactHeader,
                ]}
              >
                <Text>Admission Number</Text>
              </View>
              <View
                style={[styles.tableCell, styles.cellHalf, styles.compactCell]}
              >
                <Text>4 7 5 8</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.compactRow]}>
              <View
                style={[
                  styles.tableCellHeader,
                  styles.cellHalf,
                  styles.compactHeader,
                ]}
              >
                <Text>Admission Date</Text>
              </View>
              <View
                style={[styles.tableCell, styles.cellHalf, styles.compactCell]}
              >
                <Text>2 7 25</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.compactRow]}>
              <View
                style={[
                  styles.tableCellHeader,
                  styles.cellHalf,
                  styles.compactHeader,
                ]}
              >
                <Text>Branch Allotted</Text>
              </View>
              <View
                style={[styles.tableCell, styles.cellHalf, styles.compactCell]}
              >
                <Text>EC</Text>
              </View>
            </View>
            <View style={[styles.tableRow, styles.compactRow]}>
              <View
                style={[
                  styles.tableCellHeader,
                  styles.cellHalf,
                  styles.compactHeader,
                ]}
              >
                <Text>Admission Quota</Text>
              </View>
              <View
                style={[styles.tableCell, styles.cellHalf, styles.compactCell]}
              >
                <Text>Management</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.boldText, { marginTop: 2, fontSize: 7 }]}>
            Remarks if any
          </Text>
          <View style={[styles.remarksBox, { marginTop: 1 }]}></View>
        </View>
        <View style={styles.photoBox}>
          <Text>Affix a Stamp size photo</Text>
        </View>
      </View>

      {/* Candidate Details Section */}
      <Text style={[styles.boldText, { marginTop: 3, marginBottom: 2 }]}>
        To be filled by the Candidates
      </Text>
      <View style={[styles.table, styles.compactTable]}>
        {/* Name Row */}
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Name (BLOCK LETTERS)</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text style={styles.boldText}>ARAVIND P R</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          ></View>
        </View>

        {/* Personal Details Rows */}
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Date of Birth (DD/MM/YYYY)</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>12/04/2005</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Gender</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>Male</Text>
          </View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Blood Group</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>O+ve</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Religion/Caste</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>Hindu-General</Text>
          </View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Day Scholar</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>Y</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>N</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          ></View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Admitted Category</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>General</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>State of Residence</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>KERALA</Text>
          </View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Nationality</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>INDIA</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellHalf, styles.compactCell]}
          ></View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Father's Name</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>RADHAKRISHNAN S</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Mother's Name</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>SREELATHA</Text>
          </View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Name of Guardian</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>RADHAKRISHNAN S</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Occupation of Parent/Guardian</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          ></View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Relationship</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>FATHER</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>AADHAR no. of student</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>255952399871</Text>
          </View>
        </View>

        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Email ID</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>ananduappu715@gmail.com</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Father</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>sreelatharadhakrishnan074@gmail.com</Text>
          </View>
        </View>
      </View>

      {/* Address Details Section */}
      <Text style={[styles.boldText, { marginTop: 3, marginBottom: 2 }]}>
        Address Details
      </Text>
      <View style={[styles.table, styles.compactTable]}>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellThird,
              styles.compactHeader,
            ]}
          >
            <Text>Permanent Address</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellThird,
              styles.compactHeader,
            ]}
          >
            <Text>Contact Address</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellThird,
              styles.compactHeader,
            ]}
          >
            <Text>Local Guardian</Text>
          </View>
        </View>
        <View style={[styles.tableRow, { minHeight: 20 }]}>
          <View
            style={[styles.tableCell, styles.cellThird, styles.compactCell]}
          >
            <Text>PUNNELL HOUSE CHERUVARANAM MUTTATHIPARAMBU PO</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellThird, styles.compactCell]}
          >
            <Text>PUNNELL HOUSE CHERUVARANAM MUTTATHIPARAMBU PO</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellThird, styles.compactCell]}
          >
            <Text>PUNNELL HOUSE CHERUVARANAM MUTTATHIPARAMBU PO</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellThird,
              styles.compactHeader,
            ]}
          >
            <Text>Phone Number</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellThird, styles.compactCell]}
          >
            <Text>6282160980</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellThird, styles.compactCell]}
          >
            <Text>9142311217</Text>
          </View>
        </View>
      </View>

      {/* Educational Details Section */}
      <Text style={[styles.boldText, { marginTop: 3, marginBottom: 2 }]}>
        Educational Details
      </Text>
      <View style={[styles.table, styles.compactTable]}>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Name of Qualifying Examination</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>DIPLOMA IN INSTRUMENTATION ENGINEERING</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Register Number</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>2201080349</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Institution</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>GOVT POLY TECHNIC COLLEGE CHERTHALA</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>TC number</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>A4/253/2025</Text>
          </View>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Date of TC</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          >
            <Text>19/05/2025</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellQuarter,
              styles.compactHeader,
            ]}
          >
            <Text>Inst. Issued TC</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>GOVT POLY TECHNIC COLLEGE CHERTHALA</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
          ></View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellSixth,
              styles.compactHeader,
            ]}
          >
            <Text>
              Marks of Qualifying Examination(+2/Diploma) *other than LET
            </Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellSixth, styles.compactCell]}
          >
            <Text>*Physics</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellSixth, styles.compactCell]}
          >
            <Text>*Chemistry</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellSixth, styles.compactCell]}
          >
            <Text>*Maths</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellSixth, styles.compactCell]}
          >
            <Text>TOTAL</Text>
          </View>
          <View
            style={[styles.tableCell, styles.cellSixth, styles.compactCell]}
          >
            <Text>PERCENT RECOGNA</Text>
          </View>
        </View>
      </View>

      {/* Entrance Examination Details Section */}
      <Text style={[styles.boldText, { marginTop: 3, marginBottom: 2 }]}>
        Entrance Examination Details
      </Text>
      <View style={[styles.table, styles.compactTable]}>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Roll Number</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>162657</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Rank</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>2447</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Bank Account Details</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>Account No. 40558101056228</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>IFSCode</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>KLGB0040558</Text>
          </View>
        </View>
        <View style={[styles.tableRow, styles.compactRow]}>
          <View
            style={[
              styles.tableCellHeader,
              styles.cellHalf,
              styles.compactHeader,
            ]}
          >
            <Text>Bank</Text>
          </View>
          <View style={[styles.tableCell, styles.cellHalf, styles.compactCell]}>
            <Text>KERALA GRAMIN BANK</Text>
          </View>
        </View>
      </View>

      {/* Declaration Section */}
      <View style={[styles.declaration, { marginTop: 4, marginBottom: 4 }]}>
        <Text>
          I hereby declare that all the particulars furnished above are true. I
          am willing to undergo any kind of punishment including expulsion from
          the College, if found that any of the above statements are false.
        </Text>
        <Text style={{ marginTop: 6 }}>Date: 7/2/2025 10:23:26</Text>
        <Text>Place: Cherthala</Text>
      </View>

      {/* Verification Section */}
      <View style={[styles.divider, { marginVertical: 3 }]} />
      <Text style={{ fontSize: 7 }}>
        Verification(Exclusively for office use)
      </Text>
      <Text style={{ fontSize: 7, marginBottom: 4 }}>
        Academic eligibility verified and eligible for admission as per the
        prospectus.
      </Text>

      {/* Signatures Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
          marginBottom: 8,
        }}
      >
        <View style={{ alignItems: "center", width: "30%" }}>
          <Text style={{ fontSize: 7 }}>Professor/JOD</Text>
          <View style={styles.signatureLine}></View>
        </View>
        <View style={{ alignItems: "center", width: "30%" }}>
          <Text style={{ fontSize: 7 }}>A.O</Text>
          <View style={styles.signatureLine}></View>
        </View>
        <View style={{ alignItems: "center", width: "30%" }}>
          <Text style={{ fontSize: 7 }}>Principal</Text>
          <View style={styles.signatureLine}></View>
        </View>
      </View>

      {/* Fee Collection Section */}
      <View style={{ marginTop: 4 }}>
        <Text style={[styles.boldText, { fontSize: 7 }]}>FEE COLLECTED</Text>
        <View style={[styles.table, { marginTop: 2 }]}>
          <View style={[styles.tableRow, styles.compactRow]}>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text></Text>
            </View>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text>Signature</Text>
            </View>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text>RL</Text>
            </View>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text>DL</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.compactRow]}>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text>INSTITUTION A/C</Text>
            </View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            >
              <Text>Rs.</Text>
            </View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            ></View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            ></View>
          </View>
          <View style={[styles.tableRow, styles.compactRow]}>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text>Institution Development A/C</Text>
            </View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            >
              <Text>Rs.</Text>
            </View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            ></View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            ></View>
          </View>
          <View style={[styles.tableRow, styles.compactRow]}>
            <View
              style={[
                styles.tableCellHeader,
                styles.cellQuarter,
                styles.compactHeader,
              ]}
            >
              <Text>PTA A/C</Text>
            </View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            >
              <Text>Rs.</Text>
            </View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            ></View>
            <View
              style={[styles.tableCell, styles.cellQuarter, styles.compactCell]}
            ></View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default AdmissionFormPDF;
