import React, { useState } from "react";
import "daisyui";

const UploadFile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    username_place: "",
    password_place: null,
    email_place: null,
    email_password_place: null,
    auth_token_place: null,
    phone_number_place: null,
    otp_secret_place: null,
    otp_recovery_place: null,
  });

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onAccountTypeChange = (value) => {
    setAccountType(value);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username_place) {
      console.error("Please select a Username Place");
      return;
    }

    if (!selectedFile) {
      console.error("Please select a file to upload");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("file", selectedFile);
    formDataObj.append("account_type", accountType);
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        "https://tweetaraby.xyz/api/checker/upload/",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (!response.ok) {
        throw new Error(`Error uploading file: ${response.statusText}`);
      }

      console.log("File uploaded successfully!");
      setFormData({
        username_place: "",
        password_place: null,
        email_place: null,
        email_password_place: null,
        auth_token_place: null,
        phone_number_place: null,
        otp_secret_place: null,
        otp_recovery_place: null,
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const accountTypeOptions = [
    { value: "", label: "Choose Account Type" },
    { value: "tweeter", label: "tweeter" },
    { value: "reactor", label: "reactor" },
    { value: "browser", label: "browser" },
  ];

  const placementOptions = [...Array(8)].map((_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }));

  placementOptions.push({ value: null, label: "None" });

  const placementOptionsWithoutNone = placementOptions.filter(
    (option) => option.value !== null
  );

  return (
    <>
      <button
        className="btn mb-3 bg-green-500 text-white"
        onClick={() => setIsOpen(true)}
      >
        Upload File{" "}
      </button>{" "}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg"> Upload File </h3>{" "}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div
                className="bg-white text-center rounded w-full max-w-sm min-h-[180px] py-4 px-4 flex flex-col items-center justify-center border-2 border-gray-300 mx-auto font-[sans-serif]"
                onClick={() => document.getElementById("uploadFile1").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 mb-3 fill-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z" />
                  <path d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z" />
                </svg>{" "}
                {selectedFile ? (
                  <p className="text-gray-400 font-semibold text-sm">
                    File selected: {selectedFile.name}{" "}
                  </p>
                ) : (
                  <p className="text-gray-400 font-semibold text-sm">
                    Drag & Drop or{" "}
                    <span className="text-[#007bff]"> Choose file </span> to
                    upload{" "}
                  </p>
                )}{" "}
                <input
                  type="file"
                  id="uploadFile1"
                  className="hidden"
                  onChange={onFileChange}
                  accept="text/plain"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Text Files are Allowed.{" "}
                </p>{" "}
              </div>
              <div className="form-control">
                <label className="label"> Account Type </label>{" "}
                <select
                  className="select select-bordered"
                  value={accountType}
                  onChange={(e) => onAccountTypeChange(e.target.value)}
                >
                  {" "}
                  {accountTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {" "}
                      {option.label}{" "}
                    </option>
                  ))}{" "}
                </select>{" "}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label" htmlFor="username_place">
                    Username Place{" "}
                  </label>{" "}
                  <select
                    id="username_place"
                    name="username_place"
                    value={formData.username_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptionsWithoutNone.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password_place">
                    Password Place{" "}
                  </label>{" "}
                  <select
                    id="password_place"
                    name="password_place"
                    value={formData.password_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="email_place">
                    Email Place{" "}
                  </label>{" "}
                  <select
                    id="email_place"
                    name="email_place"
                    value={formData.email_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="email_password_place">
                    Email Password Place{" "}
                  </label>{" "}
                  <select
                    id="email_password_place"
                    name="email_password_place"
                    value={formData.email_password_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="auth_token_place">
                    Auth Token Place{" "}
                  </label>{" "}
                  <select
                    id="auth_token_place"
                    name="auth_token_place"
                    value={formData.auth_token_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="phone_number_place">
                    Phone Number Place{" "}
                  </label>{" "}
                  <select
                    id="phone_number_place"
                    name="phone_number_place"
                    value={formData.phone_number_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="otp_secret_place">
                    OTP Secret Place{" "}
                  </label>{" "}
                  <select
                    id="otp_secret_place"
                    name="otp_secret_place"
                    value={formData.otp_secret_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="otp_recovery_place">
                    OTP Recovery Place{" "}
                  </label>{" "}
                  <select
                    id="otp_recovery_place"
                    name="otp_recovery_place"
                    value={formData.otp_recovery_place}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    {" "}
                    {placementOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    ))}{" "}
                  </select>{" "}
                </div>{" "}
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel{" "}
                </button>{" "}
                <button type="submit" className="btn btn-primary">
                  Upload{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};

export default UploadFile;