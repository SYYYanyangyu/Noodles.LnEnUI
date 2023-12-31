import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { reqAlbumList } from '../api/listenadmin/album';
import type { AlbumResponse } from "../api/listenadmin/album/type";
import { reqEpisodeList } from '../api/listenadmin/episode';
import type { EpisodeResponse } from "../api/listenadmin/episode/type";
import { List, ListItem, ListItemText, Collapse, makeStyles, Theme, createStyles, Divider, ListItemIcon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RandomEmoji from '../utils/emoji.tsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      margin: theme.spacing(1, 0),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    albumName: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      color: theme.palette.text.primary,
    },
    episodeName: {
      fontSize: '1rem',
      color: theme.palette.text.secondary,
    },
    icon: {
      color: 'red', // 自定义颜色
    },
  }),
);

const Album: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<string[]>([]);
  const [albumData, setAlbumData] = useState<AlbumResponse[] | null>(null);
  const [episodeData, setEpisodeData] = useState<{ [id: string]: EpisodeResponse[] }>({});

  const navigate = useNavigate();
  const location = useLocation();

  const categoryId = new URLSearchParams(location.search).get('categoryId') as string || 'default';

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response: AlbumResponse[] = await reqAlbumList(categoryId);
        setAlbumData(response);
      } catch (error) {
        console.error('Error fetching album list:', error);
      }
    };
    fetchAlbumData();
  }, [categoryId]);

  const handleClick = async (id: string) => {
    console.log('click', id,open);
    if (open.includes(id)) {
      // close
      setOpen(open.filter((item) => item !== id));
    }
    else {
      // open
      setOpen([...open, id]);
      if (!episodeData[id]) {
        try {
          const episodeResult: EpisodeResponse[] = await reqEpisodeList(id);
          setEpisodeData((prev) => ({ ...prev, [id]: episodeResult }));
        } catch (error) {
          console.error('Error fetching episode list:', error);
        }
      }
    }
  };

  const handleEpisodeClick = (audioUrl: string, id: string, name: string) => {
    console.log('click', audioUrl, id, name);
    navigate(`/play?audioUrl=${audioUrl}&id=${id}&name=${name}`);
  };

  return (
    <List className={classes.root}>
      {albumData?.map((item) => (
        <div key={item.id}>
          <ListItem button onClick={() => handleClick(item.id)} className={classes.listItem}>
            <ListItemIcon>
              <RandomEmoji className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={item.name.english} classes={{ primary: classes.albumName }} />
            {open.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open.includes(item.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {episodeData[item.id]?.map((secondItem) => (
                <ListItem
                  button
                  className={`${classes.nested} ${classes.listItem}`}
                  key={secondItem.id}
                  onClick={() => handleEpisodeClick(secondItem.audioUrl,secondItem.id,secondItem.name.chinese)}
                >
                  <ListItemIcon>
                    <PlayArrowIcon />
                  </ListItemIcon>
                  <ListItemText primary={secondItem.name.chinese} classes={{ primary: classes.episodeName }} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default Album;