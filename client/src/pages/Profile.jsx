import React, { useEffect, useState } from "react";
import { myDetails,updateUser } from "../services/user-service"; // adjust the path based on your project
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState({ field: "", value: "" });
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or use useNavigate() from react-router-dom
  };

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await myDetails();
      setUser(response.data);
    } catch (err) {
      setError("Failed to load user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowEditModal = (field, value) => {
    setEditField({ field, value });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = async () => {
    setSaveLoading(true);
    try {
      await updateUser(editField.field, editField.value);
  
      setUser({
        ...user,
        [editField.field.toLowerCase()]: editField.value,
      });
  
      setNotification({
        show: true,
        message: "Profile updated successfully!",
        type: "success",
      });
  
      handleCloseEditModal();
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }));
      }, 3000);
    } catch (err) {
      setNotification({
        show: true,
        message: "Failed to update profile. Please try again.",
        type: "danger",
      });
    } finally {
      setSaveLoading(false);
    }
  };
  

  if (loading) {
    return (
      <Container className="text-center mt-5 pt-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <Spinner
            animation="border"
            variant="primary"
            className="mb-3"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p className="text-muted">Loading your profile...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 pt-5">
        <Alert variant="danger" className="shadow-sm">
          <Alert.Heading>Oops!</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-danger" onClick={fetchUserDetails}>
              Try Again
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5 py-3">
      {notification.show && (
        <Alert
          variant={notification.type}
          className="shadow-sm animated fadeIn"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1050,
            animation: "fadeIn 0.5s",
          }}
        >
          {notification.message}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
            <div
              className="bg-primary text-white p-4 text-center"
              style={{
                background: "linear-gradient(135deg, #00f0ff 0%, #0066ff 100%)",
                borderBottom: "1px solid rgba(0, 240, 255, 0.2)",
              }}
            >
              <div className="mb-3">
                <div className="avatar-circle mx-auto">
                  <span className="avatar-initials">
                    {user?.name?.charAt(0)?.toUpperCase() ||
                      user?.username?.charAt(0)?.toUpperCase() ||
                      "?"}
                  </span>
                </div>
              </div>
              <h3 className="mb-0">{user?.name || "User"}</h3>
              <p className="mb-0 mt-1 text-white-50">
                Member since {new Date().getFullYear()}
              </p>
            </div>

            <Card.Body className="p-4">
              {notification.show && notification.type === "success" && (
                <Alert variant="success" className="mb-4">
                  {notification.message}
                </Alert>
              )}

              <h4 className="border-bottom pb-2 mb-4">Personal Information</h4>

              <Row className="mb-4">
                <Col sm={4} className="profile-label">
                  Full Name
                </Col>
                <Col sm={6}>{user?.name}</Col>
                <Col sm={2} className="text-end">
                  <Button
                    variant="link"
                    className="p-0 text-primary"
                    onClick={() => handleShowEditModal("Name", user?.name)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col sm={4} className="profile-label">
                  Username
                </Col>
                <Col sm={6}>@{user?.username}</Col>
                <Col sm={2} className="text-end">
                  <Button
                    variant="link"
                    className="p-0 text-primary"
                    onClick={() =>
                      handleShowEditModal("Username", user?.username)
                    }
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col sm={4} className="profile-label">
                  Email Address
                </Col>
                <Col sm={6}>{user?.email}</Col>
                <Col sm={2} className="text-end">
                  <Button
                    variant="link"
                    className="p-0 text-primary"
                    onClick={() => handleShowEditModal("Email", user?.email)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                </Col>
              </Row>

              <div className="mt-4 pt-3 border-top">
                <Row className="justify-content-center">
                  <Col md={6} className="d-grid">
                    <button
                      className="btn w-50 py-2 text-white"
                      style={{
                        backgroundColor: "red",
                        border: "1px solid #00f0ff",
                        borderRadius: "50px",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        boxShadow: "0 0 10px rgba(0, 240, 255, 0.3)",
                      }}
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField.field}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{editField.field}</Form.Label>
              <Form.Control
                type={editField.field === "Email" ? "email" : "text"}
                value={editField.value}
                onChange={(e) =>
                  setEditField({ ...editField, value: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={saveLoading}
          >
            {saveLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .avatar-circle {
          width: 100px;
          height: 100px;
          background-color: white;
          text-align: center;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .avatar-initials {
          color: #0066ff;
          font-size: 3rem;
          line-height: 1;
          font-weight: bold;
        }

        .profile-label {
          color: #6c757d;
          font-weight: 500;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animated {
          animation-duration: 0.5s;
          animation-fill-mode: both;
        }

        .fadeIn {
          animation-name: fadeIn;
        }
      `}</style>
    </Container>
  );
}

export default Profile;
