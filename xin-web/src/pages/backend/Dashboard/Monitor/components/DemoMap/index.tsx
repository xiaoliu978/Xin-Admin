import React, { useState, useEffect } from 'react';
import { AreaMap } from '@ant-design/charts';

const DemoAreaMap = () => {
  const [data, setData] = useState({ type: 'FeatureCollection', features: [] });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/410000_full.json')
      .then((response) => response.json())
      .then((json) => {
        let data = { type: 'FeatureCollection', features:  json.features.map((item: { properties: any; }) => {
          return {
            ...item,
            properties: {
              ...item.properties,
              price: (Math.random() * 100000).toFixed(2)
            }
          }
        })}
        setData(data)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const color = [
    '#6395fa',
    '#62daab'
  ];
  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [120.19382669582967, 30.258134],
      zoom: 3,
      pitch: 0,
    },
    source: {
      data: data,
      parser: {
        type: 'geojson',
      },
    },
    autoFit: true,
    color: {
      field: 'price',
      value: color,
      scale: {
        type: 'quantile',
      },
    },
    style: {
      opacity: 1,
      stroke: 'rgb(93,112,146)',
      lineType: 'dash',
      lineDash: [2, 2],
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    state: {
      active: true,
      select: true,
    },
    tooltip: {
      items: ['name', 'price'],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };

  // @ts-ignore
  return <AreaMap {...config} />;
};

export default DemoAreaMap
