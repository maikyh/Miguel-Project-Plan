import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from '../../UserContext.js';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { url } from "../../utils/Constants.jsx";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  IconButton,
  ButtonGroup,
  Input,
  Flex,
  useEditableControls
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import Uploadimage from '../UploadImage/UploadImage.jsx';
import "./UserCard.css";
  
const UserCard = ({ user, images }) => {
  const [username, setUsername] = useState(user.username);
  const [title, setTitle] = useState(user.title);
  const [about, setAbout] = useState(user.about);
  const [coins, setCoins] = useState(user.coins);
  const [isUpdating,setIsUpdating] = useState(false);
  const { updateUser, darkMode } = useContext(UserContext);

  const handleSetIsUpdating = () => {
    setIsUpdating(!isUpdating);
  }

  const image = images?.filter(image => image.public_id === user.email);
  const metaImage = images?.filter(image => image.public_id === "metaa_ez3xnh");

  const handleUpdateUsername = async () => {
    try {
      const response = await fetch(url + `/users` + `/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, title, about, coins }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const UpdatedUser = data.user;

        updateUser(UpdatedUser);

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update of Username Failed',
          text: 'Invalid username. Please try again.',
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update of Username Failed: ' + error,
        text: 'Invalid username. Please try again.',
      });
    }
  };

  const handleUpdateTitle = async () => {
    try {
      const response = await fetch(url + `/users` + `/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, title, about, coins }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const UpdatedUser = data.user;

        updateUser(UpdatedUser);

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update of Title Failed',
          text: 'Invalid title. Please try again.',
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update of Title Failed: ' + error,
        text: 'Invalid title. Please try again.',
      });
    }
  };

  const handleUpdateAbout = async () => {
    try {
      const response = await fetch(url + `/users` + `/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, title, about, coins }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const UpdatedUser = data.user;

        updateUser(UpdatedUser);

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update of About Failed',
          text: 'Invalid about. Please try again.',
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update of About Failed: ' + error,
        text: 'Invalid about. Please try again.',
      });
    }
  };

  const UpdateUsernameHelper = (e) => {
    setUsername(e.target.value);
    handleUpdateUsername();
  };

  const UpdateTitleHelper = (e) => {
    setTitle(e.target.value);
    handleUpdateTitle();
  };

  const UpdateAboutHelper = (e) => {
    setAbout(e.target.value);
    handleUpdateAbout();
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <div onClick={handleUpdateUsername}>
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        </div>
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <div className="UserCard justify-content-center align-items-center" style={{marginLeft: "152px"}}>
      {
        !isUpdating && 
      <div className="card-body d-flex align-items-center">
        <div className='preview-container' style={{ margin: "10px", marginRight: "30px", width: "200px", height: "200px" }}>
          {image && image[0] && image[0].url &&
            <img className='preview-image' src={image[0].url} alt="lol" />
          }
        </div>
        <div className='mx-2'>
          <div className="row">
            <div className="col d-flex align-items-center">
              <Editable
                style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}
                textAlign='center'
                defaultValue={user.username}
                fontSize='calc(1.325rem + .9vw)'
                isPreviewFocusable={false}
              >
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <EditablePreview />
                    <Input
                      onKeyDown={(event) => event.key === 'Enter' && UpdateUsernameHelper(event)}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ fontSize: 'calc(1.325rem + .9vw)' }}
                      as={EditableInput}
                    />
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <EditableControls />
                  </div>
                </div>
              </Editable>
            </div>
          </div>

          <div className="row">
            <div className="col d-flex align-items-center">
              <Editable
                style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}
                textAlign='center'
                defaultValue={user.title}
                fontSize='1.25rem'
                className='fw-bold'
                isPreviewFocusable={false}
              >
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <EditablePreview />
                    <Input
                      className='fw-bold'
                      onKeyDown={(event) => event.key === 'Enter' && UpdateTitleHelper(event)}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{ fontSize: '1.25rem' }}
                      as={EditableInput}
                    />
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <EditableControls />
                  </div>
                </div>
              </Editable>
            </div>
          </div>

          <p style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} className="mb-0">{user.email}</p>
          <p style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}} className="mb-1">{user.coins} coins</p>

          <div className="row">
            <div className="col d-flex align-items-center">
              <Editable
                style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}
                defaultValue={about}
                isPreviewFocusable={false}
              >
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <EditablePreview />
                    <Input
                      onKeyDown={(event) => event.key === 'Enter' && UpdateAboutHelper(event)}
                      onChange={(e) => setAbout(e.target.value)}
                      as={EditableTextarea}
                    />
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <EditableControls />
                  </div>
                </div>
              </Editable>
            </div>
          </div>

          <div className='row'>
            <div className="mt-3">
              <button onClick={() => {handleSetIsUpdating()}} className='btn btn-primary p-1 px-2'> Update Photo </button>
            </div>
          </div>

        </div>
        <div style={{ borderLeft: '2px solid gray', height: '270px', marginLeft: "40px" }}></div>
        <div className='row justify-content-center align-items-center' style={{ margin: "10px", marginLeft: "45px", marginRight: "10px", width: "400px", height: "250px" }}>
          {metaImage && metaImage[0] && metaImage[0].url &&
            <img className='' src={metaImage[0].url} alt="lol" />
          }
        </div>
      </div>
      }
      {
        isUpdating && 
        <div>
          <Uploadimage handleSetIsUpdating={handleSetIsUpdating}/>
        </div>
      }
    </div>
  );
}

export default UserCard;
