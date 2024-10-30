import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { useState } from 'react'
import { ModalTypes } from "../lib/definitions";

type modalSizeTypes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined;

/**
 * sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];
 * @param 
 * @returns 
*/
const ModalComponent = ({ 
	title, 
	buttonColor, 
	buttonVariant, 
	buttonName, 
	children, 
	closeButtonName = 'Close', 
	actionButtonName = 'Action', 
	onActionButton
}: ModalTypes ) => {
	const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = useState<modalSizeTypes>('md')
	
  const handleOpen = (size: modalSizeTypes) => {
    setSize(size)
    onOpen();
  }

	const handleAction = () => {
		if (onActionButton) {
			onActionButton()
		}
		onClose();
	}

	return (
		<>
      <div className="flex flex-wrap gap-3">
        <Button color={buttonColor} variant={buttonVariant} key={size} onPress={() => handleOpen(size)}>{buttonName}</Button>
      </div>
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent className="bg-colorBunker">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
               {children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
									{closeButtonName}
                </Button>
                <Button color="primary" onPress={handleAction}>
                  {actionButtonName}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
	)
}

export default ModalComponent;