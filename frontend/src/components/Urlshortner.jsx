import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { url } from '../url';
import { useToast } from '@chakra-ui/react'
import { AiOutlineLink } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";

const Urlshortner = () => {
  const [inputValue, setInputValue] = useState('');
  const [customURL, setCustomURL] = useState("s" + Date.now())
  const [shortURL, setShortURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const toast = useToast()

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Handle the button click event here
    if (!inputValue) {
      toast({
        title: 'Please Paste your URL...!',
        status: 'error',
        duration: 2000,
        position: 'top'
      })
    } else {
      const longURL = {
        url: inputValue
      }
      setLoading(true)
      axios.post(url, longURL).then((res) => {
        setShortURL(res.data.url)
        setLoading(false)
      }).catch((err) => {
        if (err.response.data.error) {
          toast({
            title: err.response.data.error,
            status: 'error',
            duration: 2000,
            position: 'top'
          })
        }
        setLoading(false)
      })
    }
  };
  const handleCustomURL = (e) => {
    setCustomURL(e.target.value)
  }
  const getCustomURL = () => {
    if (!inputValue) {
      toast({
        title: 'Please paste your URL...!',
        status: 'error',
        duration: 2000,
        position: 'top'
      })
    } else {
      const longURL = {
        url: inputValue,
        customURL: customURL
      }
      setLoading2(true)
      axios.post(url, longURL).then((res) => {
        setShortURL(res.data.url)
        setLoading2(false)
      }).catch((err) => {
        if (err.response.data.error) {
          toast({
            title: err.response.data.error,
            status: 'error',
            duration: 2000,
            position: 'top'
          })
        }
        setLoading2(false)
      })
    }
  }
  const copyshortenURL=()=>{
    const tempInput = document.createElement('input');
            tempInput.value = shortURL;
            document.body.appendChild(tempInput);
    
            // Select the text inside the input
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); // For mobile devices
    
            // Copy the text to the clipboard
            document.execCommand('copy');
    
            // Remove the temporary input element
            document.body.removeChild(tempInput);
            toast({
              title: 'URL COPIED',
              status: 'success',
              duration: 2000,
              position: 'top'
            })
  }
  return (
    <Box w={{ xl: "60%", lg: "60%", md: "60%", sm: "90%", base: "90%" }} m={"auto"}>
      <Flex w={"100%"}>
        <InputGroup size='md'>
          <Input color={"#ffffff"} bgColor={"#00000039"} value={inputValue} onChange={handleInputChange} placeholder='PASTE URL HERE...!' />
          <InputRightAddon onClick={handleButtonClick} fontWeight={700} _hover={{ cursor: "pointer" }} children={
            loading
              ?
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='black.500'
                size='md'
              />
              :
              "SHORT URL"
          } />
        </InputGroup>
      </Flex>
      <Heading m={"5px"} color={"#ffffff"} textAlign={"center"}>- OR -</Heading>
      <Text mb={"5px"} fontSize={"18px"} textAlign={"center"} color={"#ffffff"}>Create custom end point...</Text>
      <Flex>
        <InputGroup size='md'>
          <InputLeftAddon children={`${url}/`} />
          <Input value={customURL} onChange={handleCustomURL} color={"#ffffff"} bgColor={"#00000039"} placeholder='enter a end-point' />
          <InputRightAddon onClick={getCustomURL} fontWeight={700} _hover={{ cursor: "pointer" }} children={
            loading2
              ?
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='black.500'
                size='md'
              />
              :
              "SHORT URL"
          } />
        </InputGroup>
      </Flex>
      <br />
      <Box display={shortURL?"block":"none"}>
        <Heading mb={"5px"} color={"#ffffff"} textAlign={"center"}>SHORTEN LINK</Heading>
        <InputGroup>
          <InputLeftAddon children={<AiOutlineLink size={"20px"}/>}/>
          <Input bgColor={"#00000039"} color={"#ffffff"} value={shortURL}/>
          <InputRightAddon _hover={{cursor:"pointer"}} children={<MdContentCopy size={"20px"}/>}
          onClick={copyshortenURL}
          />
        </InputGroup>
      </Box>
    </Box>
  )
}

export default Urlshortner
