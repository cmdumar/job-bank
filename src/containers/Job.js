/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Container, Box, Text, Image, Heading, Divider, SimpleGrid, Tag, HStack,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiMoneyStack } from 'react-icons/gi';
import { FaLanguage } from 'react-icons/fa';
import {
  object, func, oneOfType, string, array,
} from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import fetchJob from '../redux/actions/job';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Job = ({
  fetchJob, job, status, error,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchJob(id);
  }, [id]);

  if (status === 'rejected') {
    return (
      <Text>{error.message}</Text>
    );
  }

  if (status === 'resolved' && job?.compensation) {
    const {
      objective, organizations, place: { remote, location },
      compensation: {
        currency, minAmount, maxAmount, periodicity,
      }, created,
      languages, strengths, serpTags: { description },
      details, members,
    } = job;

    return (
      <Container maxW="container.md">
        <Box>
          <Image
            src={organizations[0].picture}
            boxSize="130px"
            fit="cover"
            alt="company logo"
          />
          <Text pt="2" fontSize="sm">{organizations[0].name}</Text>
        </Box>
        <Box py="4">
          <Heading as="h1" size="md" pb="4">
            {objective}
          </Heading>
          <Box display="flex" alignItems="center" fontWeight="300">
            <MdLocationOn />
            <Text fontSize="sm" pl="2">
              {remote ? 'Remote' : ''}
              {location?.map((l) => ` - ${l.id} `)}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" pt="2" fontWeight="300">
            <GiMoneyStack />
            <Text fontSize="sm" pl="2">
              Salary:
              {` ${currency} ${numberWithCommas(minAmount)} to ${numberWithCommas(maxAmount)}`}
              {' '}
              {periodicity}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" pt="2" fontWeight="300">
            <AiOutlineClockCircle />
            <Text fontSize="sm" pl="2">
              Posted on
              {` ${new Date(created).toLocaleString('en-us', { day: 'numeric', month: 'long' })}`}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" pt="2" fontWeight="300">
            <FaLanguage />
            <Text fontSize="sm" pl="2">
              Language(s)
              {languages?.map((lan) => ` - ${lan.language.name} (${lan.fluency})`)}
            </Text>
          </Box>
        </Box>
        <Divider />
        <Box py="4">
          {strengths?.map((str) => (
            <Tag key={str.id} size="md" colorScheme="red" borderRadius="full" m="1">
              {str.name}
            </Tag>
          ))}
        </Box>
        <Divider />
        <Box py="4">
          <Heading as="h3" size="sm" fontWeight="600">DESCRIPTION</Heading>
          <Text pt="2">
            {details?.filter((obj) => obj.code === 'organizations')[0].content}
          </Text>
        </Box>
        <Divider />
        <Box py="4">
          <Heading as="h3" size="sm" fontWeight="600">RESPONSIBILITIES</Heading>
          <Text
            pt="2"
            dangerouslySetInnerHTML={{ __html: details?.filter((obj) => obj.code === 'requirements')[0].content.split('.').join('<br />') }}
          />
        </Box>
        <Divider />
        <Box py="4">
          <Heading as="h3" size="sm" fontWeight="600">YOU'LL BE WORKING WITH</Heading>
          <SimpleGrid minChildWidth="200px" spacing="20px" pt="3">
            {members?.map(({ id, person: { name, picture, professionalHeadline } }) => (
              <Box key={id} bg="gray.100" color="black" p="8" pb="12" borderRadius="md" w="100%" textAlign="center">
                <Image
                  borderRadius="full"
                  boxSize="100px"
                  mx="auto"
                  src={picture}
                  alt={`${name} Photo`}
                  mb="4"
                />
                <Text fontSize="md" fontWeight="500">{name}</Text>
                <Text fontSize="sm">{professionalHeadline}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    );
  }

  return (
    <Text>Loading...</Text>
  );
};

Job.propTypes = {
  fetchJob: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  job: object.isRequired,
  status: string.isRequired,
  error: oneOfType([string, object, array]),
};

Job.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  job: state.job,
  status: state.status,
  error: state.error,
});

export default connect(mapStateToProps, { fetchJob })(Job);
