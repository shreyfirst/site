import React, { Fragment } from 'react'
import {
  Container,
  Heading,
  Box,
  Text,
  Section,
  Flex,
  Card,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

const Header = Section.withComponent('header')

const Calendar = Flex.extend`
  flex-direction: column;
  flex-shrink: 0;
  text-align: center;
  border-width: 4px;
  width: 96px;
  height: 96px;
  border-color: ${props => cx(props.color)};
  border-style: solid;
  border-radius: 12px;
  font-weight: ${props => props.theme.bold};
`
const Year = Text.extend.attrs({
  f: 3,
  py: 1,
  color: 'white'
})`
  line-height: 1;
`
const Month = Text.extend.attrs({ f: 4, mt: 1 })`
  line-height: 2;
`

const Updater = Container.withComponent(Flex).extend`
  flex-direction: column;
  align-items: center;
  ${props => props.theme.mediaQueries.md} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`
const Sheet = Card.extend`
  box-sizing: border-box;
  width: 100%;
  max-width: 48rem;
  max-height: 24rem;
  position: relative;
  padding-top: 55%;
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadows[1]};
  transition: 0.25s ease-out box-shadow;
  &:hover {
    box-shadow: ${props => props.theme.boxShadows[2]};
  }
  ${props => props.theme.mediaQueries.md} {
    padding-top: 41.25%; // NOTE(@lachlanjc): i just guessed until i found this
  }
`
const Player = Box.withComponent(YouTubePlayer).extend`
  position: absolute;
  top: 0;
  left: 0;
`

const Update = ({ month, year, color = 'primary', url, ...props }) => (
  <Updater>
    <Calendar color={color} mb={[3, 0]} mr={[null, 3, 4]}>
      <Year bg={color} children={year} />
      <Month color={color} children={month} />
    </Calendar>
    <Sheet>
      <Player
        url={url}
        width="100%"
        height="100%"
        controls
        config={{ youtube: { playerVars: { showinfo: 1 } } }}
      />
    </Sheet>
  </Updater>
)

export default () => (
  <Fragment>
    <Helmet title="Updates – Hack Club" />
    <Nav color="slate" style={{ position: 'absolute', top: 0 }} />
    <style children={`body{background:${cx('snow')};}`} />
    <Header py={4} mt={5} align="center">
      <Container maxWidth={32}>
        <Heading.h1 color="black" f={6}>
          Updates
        </Heading.h1>
        <Text f={4} color="muted" style={{ lineHeight: '1.25' }}>
          Every month we send out an update with what’s new at Hack Club. Here
          they all are!
        </Text>
      </Container>
    </Header>
    <Container py={4}>
      <Update
        color="teal.6"
        month="March"
        year={2018}
        url="https://youtu.be/Xj32LuE44bU"
      />
      {/* NOTE(@lachlanjc): use lime.6 for april */}
    </Container>
    <Footer />
  </Fragment>
)
