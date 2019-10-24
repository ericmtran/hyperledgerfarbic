package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type certificate struct {
	CertificateID string `json:"certificateid"` //the fieldtags are needed to keep case from bouncing around
	IssuerID      string `json:"issuerid"`
	TrainerID     string `json:"trainerid"`
	StudentID     string `json:"studentid"`
}

// ===================================================================================
// Main
// ===================================================================================
func main() {
	err := shim.Start(new(certificate))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}

var logger = shim.NewLogger("certificate0")

// Init initializes chaincode
// ===========================
func (t *certificate) Init(stub shim.ChaincodeStubInterface) pb.Response {
	logger.Info("########### example_cc0 Init ###########")

	_, args := stub.GetFunctionAndParameters()
	var A, B string    // Entities
	var Aval, Bval int // Asset holdings
	var err error

	// Initialize the chaincode
	A = args[0]
	Aval, err = strconv.Atoi(args[1])
	if err != nil {
		return shim.Error("Expecting integer value for asset holding")
	}
	B = args[2]
	Bval, err = strconv.Atoi(args[3])
	if err != nil {
		return shim.Error("Expecting integer value for asset holding")
	}
	logger.Info("Aval = %d, Bval = %d\n", Aval, Bval)

	// Write the state to the ledger
	err = stub.PutState(A, []byte(strconv.Itoa(Aval)))
	if err != nil {
		return shim.Error(err.Error())
	}

	err = stub.PutState(B, []byte(strconv.Itoa(Bval)))
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}

// Invoke - Our entry point for Invocations
// ========================================
func (t *certificate) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()
	fmt.Println("invoke is running " + function)

	// Handle different functions
	if function == "createCert" { //create a new cert
		return t.createCert(stub, args)
	} else if function == "initLedger" {
		return t.initLedger(stub, args)
	} else if function == "queryCert" { //read a cert
		return t.queryCert(stub, args)
	} else if function == "queryAllCerts" { //read all certs
		return t.queryAllCerts(stub, args)
	}
	fmt.Println("invoke did not find func: " + function) //error
	return shim.Error("Received unknown function invocation")
}

// initialize the ledger with 5 certificates
func (t *certificate) initLedger(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {
	certificates := []certificate{
		certificate{CertificateID: "1111", IssuerID: "2222", TrainerID: "3333", StudentID: "4444"},
		certificate{CertificateID: "1112", IssuerID: "2223", TrainerID: "3334", StudentID: "4445"},
		certificate{CertificateID: "1113", IssuerID: "2224", TrainerID: "3335", StudentID: "4446"},
		certificate{CertificateID: "1114", IssuerID: "2225", TrainerID: "3336", StudentID: "4447"},
		certificate{CertificateID: "1115", IssuerID: "2226", TrainerID: "3337", StudentID: "4448"},
	}

	i := 0
	for i < len(certificates) {
		fmt.Println("i is ", i)
		certAsBytes, _ := json.Marshal(certificates[i])
		APIstub.PutState("CERT"+strconv.Itoa(i), certAsBytes)
		fmt.Println("Added", certificates[i])
		i = i + 1
	}
	return shim.Success(nil)
}

// ============================================================
// initMarble - create a new marble, store into chaincode state
// ============================================================
func (t *certificate) createCert(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var cert = certificate{CertificateID: args[1], IssuerID: args[2], TrainerID: args[3], StudentID: args[4]}

	certAsBytes, _ := json.Marshal(cert)
	APIstub.PutState(args[0], certAsBytes)

	return shim.Success(nil)
}

func (t *certificate) queryCert(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	certAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(certAsBytes)
}
func (t *certificate) queryAllCerts(APIstub shim.ChaincodeStubInterface, args []string) pb.Response {

	startKey := "CERT0"
	endKey := "CERT999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllCerts:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
