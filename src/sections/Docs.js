import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text, Flex} from 'rebass/styled-components';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
// import FontAwesomeIcon from 'react-fontawesome';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';



const CARD_HEIGHT = '350px';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['5vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />
  
    <Triangle
      color="primaryDark"
      height={['40vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />
  
    <Triangle
      color="secondary"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
  );
  
  const CoverImage = styled.img`
    width: 100%;
    object-fit: cover;
  `;
  
  const EllipsisHeading = styled(Heading)`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-inline-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    border-bottom: ${(props) => props.theme.colors.primary} 5px solid;
  `;

  const Post = ({ title, text, file, date, thumbnail}) => (
    <a
      href={file.file.url}
      target="__blank"
      title={title}
      style={{ textDecoration: 'none' }}
    >
      <Flex style={{ height: CARD_HEIGHT }}>
        <Card
          pb={4} 
          onClick={() => window.open(file.file.url, '_blank')}
        >
       
          <EllipsisHeading m={3} p={1} color="text">
            {title}
          </EllipsisHeading>
          {file && <CoverImage src={thumbnail.image.src} height="100px" alt={file.file.fileName} />}
          <Text m={3} color="text">
            {text}
          </Text>
          <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
            {date.substring(0, 10)}
          </ImageSubtitle>
        </Card>
      </Flex>
    </a>
  );
  
  Post.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    // fileName: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  };

  // const parsePost = (author) => (postFromGraphql) => {
  //   const { id, uniqueSlug, createdAt, title, virtuals } = postFromGraphql;
  //   const image =
  //     virtuals.previewImage.imageId &&
  //     `${MEDIUM_CDN}/${virtuals.previewImage.imageId}`;
  
  //   return {
  //     id,
  //     title,
  //     time: virtuals.readingTime,
  //     date: createdAt,
  //     text: virtuals.subtitle,
  //     image,
  //     url: `${MEDIUM_URL}/@${author.username}/${uniqueSlug}`,
  //     Component: Post,
  //   };
  // };
   const edgeToArray = (data) => data.edges.map((edge) => edge.node);

  const Docs = () => (
    <StaticQuery
      query={graphql`
       query Docsquery {
  # contentfulDocument {
  #   date
  #   text
  #   title
  #   file{
  #     file{
  #       fileName
  #       url
  #     }
  #   }   
  # }
  allContentfulDocument {
    edges {
      node {
        thumbnail{
          id
          image: resize(width: 100, quality: 100) {
                  src
                }
        }
        date
        text
        title
        file {
          file {
            fileName
            url
          }
        }
      }
    }
  }


}
  
    `}
      render={({allContentfulDocument}) => {
        const docs = edgeToArray(allContentfulDocument)
        return (
          (
            <Section.Container id="docs" Background={Background}>
              <Section.Header name="Docs" icon="✍️" label="docs" />
              <CardContainer minWidth="300px">
                {docs.map((d, i) => (
                  
                  <Fade bottom delay={i * 200} key={d.id}>
                    <Post {...d} key={d.id} />
                  </Fade>
                ))}
              </CardContainer>
            </Section.Container>
          )
        );
      }}
    />
  )
  export default Docs;