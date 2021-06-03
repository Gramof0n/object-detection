import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Grid, Text } from "@chakra-ui/layout";
import React, { RefObject, useRef } from "react";
import { ChangeEventHandler } from "react";

interface Props {
  imageUpload: ChangeEventHandler<HTMLInputElement>;
}

const HeaderBar = (props: Props) => {
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  return (
    <>
      <Grid
        height="60px"
        backgroundColor="#628ea8"
        gridTemplateColumns="repeat(2, 1fr)"
        width="100%"
      >
        <Flex
          alignContent="center"
          height="100%"
          flexDir="column"
          justifyContent="center"
          pl="5"
        >
          <Text fontSize="xl" color="white">
            Object detection
          </Text>
        </Flex>

        <Flex
          height="100%"
          flexDir="column"
          alignItems="flex-end"
          justifyContent="center"
          pr="5"
        >
          <Input
            type="file"
            accept="image/*"
            border="none"
            alignSelf="center"
            display="none"
            ref={inputRef}
            onChange={props.imageUpload}
            multiple={false}
          />
          <Button
            onClick={() => {
              inputRef?.current?.click();
            }}
          >
            Browse
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

export default HeaderBar;
