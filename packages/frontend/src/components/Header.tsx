import {
  Heading,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

export default function Header() {
  return (
    <Heading display="flex" flexDirection="row" size={["md", "lg", "xl"]}>
      <Text>
        <Popover>
          <PopoverTrigger>
            <span className="colored-header">AWS</span>
          </PopoverTrigger>

          <PopoverContent ml="2rem">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontSize="xl">What is this project?</PopoverHeader>
            <PopoverBody
              fontSize="md"
              display="flex"
              flexDirection="column"
              gap="0.5rem"
            >
              This project is a web application, specifically designed as a
              Kanban board, to facilitate task management and workflow
              visualization. Built on Amazon Web Services (AWS), the platform
              leverages the power, scalability, and reliability of cloud
              computing to deliver an efficient and user-friendly experience.
              <Text>Key Features: </Text>
              <OrderedList display="flex" flexDirection="column" gap="0.25rem">
                <ListItem>
                  Task Management: Users can create, update, and track tasks in
                  real-time, fostering productivity and collaboration.
                </ListItem>
                <ListItem>
                  Workflow Visualization: The Kanban board visually maps out the
                  workflow, enabling users to see the status of tasks at a
                  glance.
                </ListItem>
                <ListItem>
                  Cloud-Based: Being hosted on AWS ensures high availability,
                  scalability, and data security. The primary goal of this
                  project is to provide an intuitive tool that helps teams and
                  individuals manage their work more effectively, streamline
                  processes, and enhance productivity.
                </ListItem>
              </OrderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        ome Kanban
      </Text>
    </Heading>
  );
}
