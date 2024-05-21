import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/src/components/Themed';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native';
import AccommodationListItem from '@/src/components/AccommodationListItem';

export default function TabSearch() {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };


  const dummyData = [{
    title: 'Cabin',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIWFhUXFxgYFhgYGBgXHRkYFxgXIBgaGhgdHSggGB0lGxcaITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy8mHyYvLS03Mi8tLS8tLy8tLS0tLS0tLS01LS0tLS0tLS0tLS0vLS8tLS0tLS0tLS0tLS0tLf/AABEIAL4BCgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEHAP/EAEoQAAIBAgQDBgMFBAgEAwkBAAECEQADBBIhMQVBUQYTImFxgTKRoRQjQlKxYqLB8AcWM3KCktHhFVOT8UOy0iU0RFRkc6PC0yT/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QANhEAAgECBAEJBwQCAwAAAAAAAQIAAxEEEiExQQUTIlGBkaGx0RQyYXHB4fAVIzNCUvFicpL/2gAMAwEAAhEDEQA/AFeL7MX0nKBdA/JJYetsgP8AIEedKQN/KvYhjFcRetZv2h4/eCQ6+gY+lU4rguHxMwVcxs0swHLxDLeUeRBFdqnygy6VF7px3wKPrTaeSrVgrX8T7DlZa0xAH5vGv/UQSvoyj1rOYrhl21rcQhfzCGX/ADiRPlM10KOJpVPdOs51bDVafvCCxXa6BUq1CZLyK1IV9FSAq5RnAKsrgqQFS0EmRK19FWp51O7aipeVfSUBa7lqwLXctFBzSrLXYqzLXQtSVmleWpBKnlrsVJWaV5K+yVbFdCVLys0pyV3JV4WuZaq8rNKcldyVblruWpeVmlQWu5aIt2ZqxMOQdqEuBDCsYIEr7uzTW3hQfKrmwZAmlmsI8YZiLxPbtTRVq2KJ7mdqkij3oWe8OnTywZ8Jzr58P0ptbsSNa+Wzm0pPOzUMOOET3MPFR7mn64LrXPsgqvaBD9ljIHp/Pr/pS61x6wxi5KEH8Y5jnmG30qWJ4xZR+7doYGOoDc1P7XlVdpLd4qPCwhjyP5o9OXzriNUQmwM6qUXAuwMfYXGtoyXM45Fjn+Tghx6ZqvN622ty2UJ3ZNdPMqAx91b1rH9nLQXEXMogZTp55yP4Uzx3HkTwp94+pAXxSRMqVU51Mcysa1ObBl86V4yXE+zmFeCHtrmMAhltkkctJT5qhrP4/slet6qQw5ZvAT6EkofZp8qB4jZuXroL3MxOsBg4VEgyz2wSsMQpm0B4p1gmmGEv4qyJs3GZf2TnU+uUsAOXjyVa43E0TYajvhHCYWutzoe787YjvYd0MOrKejAj313FRFae32stMAmIsrBI1twQZ2PdkMh15gDY61ceEYS//YXQrflJyH/I5g+zj0roUeWKTaOLGc+vyLVXWmcw/PzhMmKmBTfHdmr9s/Dm9JB9lOrf4ZpUyEEgggjcHQj2rqU6qVBdDecarSqUzZwRPgtTH0riipqs0cRecAqZtmurbq5RQlpYHXBgtTFo9KKtWpq84U0JqQ1oki8XFIr7JRjWIrhszVh4s0zBctdAq82a6LVFmEXlaDxXctE91Xe6qs8mUwXLX0UclgVeuBnlQmqBGrh2baLEBBpxhVB9ammDK/EtX28NzX5UipVDTdh8OyHWdFoHyqa2iN6lbEaGjLMHSsjMROkiAxS1kTIqu7hiDPvTVbMT60Rasg76VDWtK9nBi/BpIoxMLrV9zKutDXMWTsKUWZto4BUFjLbgAofOvWod0TvX3cetWFA4yEk7CLMRwK3dxKAnO8O9wo3eaDwoIJW4DNwn4pOXnFWYns0AfDcytyDypnyW5lY/9Q1rE4DaDFkChiMpzW7byJ0BJGY/5qxZ7YXLTG3dskAAEm27KI1/8O5nXka4ooCpewnYOIalYXkbnDcRYzGNGUgnaQZnV/ANSdnNLsNiLVksMTbLoRoGXMN/iXSDG0jbrWl4R2gt3yww6uGUS/ga2VBkAk2WhtR+WoXcMt69bUW3Y5s9xyk6WxooZMrrL5TEbKfeslSnsxl56VX3lB8IFbweC+K3CNHwsimf8bCQeQh+dLcbaCLnWVIDQQSNp25j51qcRwOwx+HKx6HKT5lW7q43uzUDi+zmUELcOuhDwsgjUAMEB/zN70YxFQe8LxZwtEjoMR89fKJGsjNnuoUG+Zzma4zR4g027jeHkHf4hA0IoPF4RWYKHCFjoisJVRJZmgKyiNsqtvBJkVp2xOMsKA9tXUCADoIGwDNlDdNM38aR8L4jbz3C0gOCyBUyDVjpsBcXwkTB+Gr56i4s2nzg+z4hDdDcfA/SF4XF4q0p7q4LlsCSs94vuh8X+JlUc+tNuGY0Y4G2+Gy+HS7ICicwGUPJklT8HTpS2xhLbm2B3Zm6BlYZhEfiSZj5Uz7QYQjD5SzNce4S3dyodjAUEBXZUACiBJhedEtMKc1JpT1SwKVl7xr9IuxnZi4oLIQ6jnoPqCVHuwPlSx7DIYZSp8xE+nWpYcGz/Y3riOJ0ysCSBMKBIYnzKjXblRdntLdCscTYR7chSwIEtzEqDbuNsPxajyrenKdZNKq3+I/PpOZU5Iw9TWi9j1H8+sFVamEpjYu4O98Fw2mP4XBX66g/uCrL/Cbi66Mp2IOh9DsT5KTW6ljqNXY2+cwVuTa9L3luPhrALa1eCepr7u40Ig9Kmq08mZ1FpURVlq2JqYt0RZtdKEtpCVLmB3LMVAW6OeyelcTDk7CasPpFtSudBA+7q2xb8h70YuDPQ0wwXDgd40oHrACOo4Ri0AtYYHQiPX/WjbOHA5U0+yACKh9nPKsbV7zqJhwsEFsfDVSWPF70ebEakV8qzQZ+qMyQE4STrv5UQtiBNEhYqpxNVnJlhAJU1yNarknnRK2KjdYLvAqweqUfjKHtg11LQ8hQz4v8o+dDXHLbmmimxmdq6jbWNLlxFGrUL9vt/tfKgSlR7qjWivExLYlzsJurbVi+OcHvlnZbRcNaA8JB8QDcpneOVbBDUwa4KOVnoKlMPvMJ2Bwj28bis9tkBtpGZSswx2ka71vL1lH0dVb+8Af1qvEk5Hy75WiN5gxHnNJ+zWIvlnW8X0UEB1IMyeonardsxvIi5RlnO1yd1hLr22dCisyw7QCqkjwkkfSvL+H/ANIuITRkVhzykoT6kTNer9rrIfC3EJgMCpI3AbTSfWvJb3Yb/l3z6Ms/vAj9K1YdMyaiYsTUyVLXtpPTcNbvXLS3O6EOJKoQJ3BzRlJHlDec1VhcIArNeVVuXGzXBMQdAFBPdFgFAHOYJjU0+7PiMNa9D/5jVPaR1bB4kZpHc3AcsMfhMwOZ8qzMAWtabVJCXmfxnZ+02iWzmPwqsrPoIQf4pf32pbcwN2wrPnfEBHyhCsWyVDByPDqM5W3GpzK2kFYB7BWrWdVR+8lxnzCNJ+HJqB869IxmAQ2lRVULbIZFAAUZQQBGUiBMjTQgUNSkEbo7wqVdqidLbqnnWIhmU3RctqD44/CMoHhceEEHpRI4YrkdxiLZEZQGzLcAO+W4WLSROojc9acDiWYqHtPJIA0zHxEARmzBRryFBY3gdu7cGa0UnVpzJIB0USSzsTGoXQBgImjL1l3sYsU6D7XHyPr6zPcOcXyyuqhFzGLYCEBeQMhRpoWaSAd6KXHvaHd4S6ltSTnYAvJnUyxY5R8I0JMjxQCS3xnZ6AwW4VzAqQy7qdCAolzO0mlmCwmIVnBtZvDbQ5XzFRbAA8J+ElQM0ncjnNQ1abe8pH53yCjUX3HB+ennp4z7+sTDw3rK3FG72yqwIkkjVBpvAnlM0Ta4nhXUslwggfAykMdBoo1DaHfN7UNftWdzcuWmka3EzoI/KPhWTqTHKlvbHAomENxLyMoCGVIkMzgEs41ecxmY1102LadQr/G/ZFVaYb+an2jSay1gXNtbgU5WEj08+Q+dcWV6iqexuJP2SyLXiZUQ3ArKCuYSCw56EGDT03Q3xIDzkaH1MDKflWxcS40YXnPbC0zqhIikyd9akoPU1dfNsMArqCdlLKG/y5pPtNdFv+enqOVaErI+xiHoOmpHbIrdYaTpUlutM5iPSpC3Uu6orCCC0st49h8Wv0owcRUCYM9KA7upBKW1NDHrVccZY3EGJ2Aq9bg6yaF7ui0RFEka0LKo2EOm7ncyaLJ1q4hV3oR8QeSx9aHuSdzQc2TvDNYDbWFXLs/DQd3AzqTrUraQZpisRvRHobQVAqjpRCbUV93dPGsTyoZ8IOVGKwMU2GI2izu6+7ujmw8VHu6LPA5q28e29xXjuH7c4q0BmxDN5FVb21Wa9lRa8svf0R3Pw4tD/etsv6Ma49LLrmnYrBzbJNJ2E7UPjDcDlSEAOi5Tr11j5VsRWM7B9lb2AN43ntshUZShbTLJYkFRyjrtWvw+JR/gcNG8HagqAZujtGUicvS3i3tVcC4diToIJO+gYToKxdrG2icveJOuhbLy10Mcq1/bafsd6ASchgASSZWIHM+VeP8AB1f7QXuhkGV9TbP5CBvoDWqgzKmkw4ukj1Ner1nuPAv/AHe1/d/iao4Xwo2XuNmBD9AQdydfnRXAl/8A81n/AO2v6VzjgP2e7lJByNBXQgxyPWszasZuQgIPlLmsKSGKqWGxIBI9DyqOLvZVAicxK77eFjP7v1rC8H4jiRisOhxF1rdwnMtxVMwpPxZZ6c69AujwN6fxFRkKnWRagdSRMHaZmvWfF4RetnL/AIlGh9a3/rtXm3D8ae/sLctOha9bAJAIkOuhM6aCvSabiAoIyzPgy5BzzFcE4fe7/u7wud1lfQllGbTLqInQmmnGMD3Npe50APwsAVgnxGBEnWZM0da4pYxIa3ZvozEbBtQNNcu//el/G7Vy2ks5IOQLqTBVQG0I5kTQKCzgRrEJTJBvBEwNzEpmhCobLOhYZYkop8KnoZ0OvSFfGuEW+7bu1yMkfDI2YKczbECdY9B5azsvpZ0/O38KT9q8Eti1evgs2fIuXoXvqSRr1PTlQOi5iDGU6rZVZeMO4P2bw62VgFWdUDsGILFRAMbAx+UCiG4MymVedI5qfYiaqxWH7/Dm0oBKqPi0ElZWIPnR3HLlwWptZswYfCJMQeUGeXKrVmta8FkUkkjaYTHYFGfJiciYgsfDnGltWGUjKeawYn8UHlC//id5RNlotL8CMqtyGpJ8S6EGZGpO0a7rjGCV7yqEQtdU6tsCoY7Qen1rP3+C9y4t2xcW6wzLkYlY1neRHh6T5bLRZyd1+Om8oUwvutbhrtB8H2kIA7+0VnTMk3BtJOX4wPM5viXrTrh/FbF7+zuKx5gGSPb4h6kAUiXAXc6km3dIDKwYBIJ0OaJAbU6aEGBrBIGu4BBAKPb8WrkZyCJIyvbBO8HlrHMmmLXK7Hv9Yp8OG3Udnp9pt0tA6jUeVfG3XnbY3E279pFu94rh9c7OFaCqguCCDPJiYmRzp9hO1FxAv2iywBGjLLSBpOWMw10/FJrQuI6x9ZnOH6j36TSi3Xxt1LA4hbqB0mD1BH0IBojJTg4OsSUtpBclWJYnpVwSui3ULSwsp+zGvhbI5UQENdE0OYwwoleVjXcvzq0zXBQRmkGayTVXcGj6jVZyJMizqcRTr/8Aju/qBFWjiKdV/eH6rXkuM7U4mzbzDK2oEERv560Gv9JmIBg2Ekbgkz8oFY6i5GsZsptnFxPZb+LtsrJnQZlI+NdJBEwYoTg+EWyWOcPmAGmXlP7R615la/pIuc7C/M/6irR/SQARmw5OvIj/AFpeZYyxnq17F2xGZSTyEAk+mtIOOdo7NgHOqSNrYU3rpnYZFYBJ28RHvWG4n2ud7YDM2Et3BKdyfEyEaZrjLI56LArMWHw1p1u2sSxuK6uFcgK0MCQxAnWN9dYoDUsbAQ+aBFyRPZeAdrrLMli9afCuwHdC4AEdYBhHAyhlBgpy5TRlm+VW79qb7vQeKANSQRpvyFeR9ouO4TF2BZS61qDmaEzaKp8IAIlefnlFVYXjTrhWsm8962YykhlYMIg6nTQc83+gCqQNYOXo30nq+COAa6rIVD29VOdgNQZEZoOgOhGlP8QDAUfjlZ6eEmfPavAOHYa6Mrm24QMCWjNMQYIiCNNjpr7V6rwztKCoyi62+9oz5mF1Ptpr0iiSrm97SAB8Jb/Va6Ltu5nUhLiuRETDgmD1itHfxCIVDMBmIAnmTt9dPcVm8R2kccyo6Nh8T57Nnjl0rDdouJPi8o+0Ws6ElHJaycoKnI+mV5OUgysZfMydR9JSqF2mx7NYJVvm6DaIVGV2tvmgyogjfdTr5U07S21uoijxAOpaJ0BG5jUCvLez2EfDHvWv28gbObbOczsRABVFzHKZgQBrPUV6Tw3tCsZlQSwUEC4kmBAgMVI96iVCTcyggy5YZ2QssuGAaZzv8Uzv560n4ji7rXMRZa4WRVRlUqBlm9EAgAkQOpp0vHx/yX/zWP8A+1BdpMZ32HZBbvKcyMICufA6mIRzvHWjvck9cvLYAX2lnG+LthrVkoLZLmCHbLMLMLrqfKjePcYt4VBcufCXCbiZIYiBz+HYUg44uHxduyt1rtvuyGHhKmSI1VlJHpVvapbGNtpb742yt1bk92zTCuIglfz7+VK5ynoLjvhNTrDMQp+Ec/8AEbFu+mEn74o11Fyk+HM2Y5ogazpNCi2wxlrO2YhDrEfheqMTjOHfalxD37S4hLZtrnuhSLbEmMmbqTrE1K1irD30xH2pJVSuRXBUzz9dTRowkqITb5iX8Xsrbs3QFzI7F2OYaO2hA05QDVvF8JaQM5BGngy6BCNyANBM0uxWAz2rtm3f1uXDdFwn4ZIlAJkiFj/FV3HsPcZcV3d3+2tqLQzeG2yBixO4GaRsNctHfa/5tFEEXt1esVcT4OgvICN7Nxg0AsWgSAPdQB+1Qz8KgQt2CMoOYkgnJ3mUZwYUKC2h3kU14o13vdCCTYvdwIGh7u0IOn/M11NWKt0Lc+7lXCgHnkGH8J31Pegrtz250IjDeQ7OcYtPNjvVNy2chGUpyEASxDHfbptT/u68F41dy4y+ZKkXG8iIPXl6+Vbi3/SBda0oQWlaMpJBYmBuPEAPenU6x2MzNS1uJ6ELdJeL9qMLhzle5mfmlsZyPXkvoTNYDHcZxFxSb+IuZSYIBFtZ6QnxekULwzAKVNzUrsMpUfU7j0phrL1wRSJnp+C7S4S4uYXlTyuHuz+9APtTewVcZkIYciCCD7ivIscMGyaXnFwbtGZQfM/xFJQyIZ76Qealwfcf70K1QRDNMqZ72bdc7qvDLXHO7JC3sQw5Fbjp03GYfyK+xHanFN4Vv3go/M7tPrBH8eVQ1AJAhntmMupaQvcYIgEknQD+elYa5/SnggSBbxDAEgEIgBHUS4MHzANec4q61xh3jvc66n3320Mf61FsGk7f+f8A9NZnxBvpGimIrXtjf2yWhPRG/wDVTfFdp7zObZw2HfKzBSbTFiFJG+fXaiF7KWBrnnXWcwHnGon9KZ27VhJygSSSSNySZO3nXTp0KzDpNYTiV8VhKb9FLnrHrMjiOLM3wqif3VBH70/rVnCMY16RCSLlrdLYgHPOuWeVa1MKl0eGwknQuQdRz0G+3WKOw/B3tWyqJCSCQAokgaSN9m09aU+AudWA/OqOp8r2XRGJ7/HWI8bZum1ay2VvMqgZWcrED8IDLMa6beVLLnHHRGD4O2oBVcroQDIbUagkiNwedbPFB7tsKl1rZXYwGj1BoK9gcTkI+1T6pbSd5GqsNfPpTWwzIvRv3A+hmROUErVBzmXtLLbzHlMnwm9Nxu7QISCYVmjYnmT0prh1Qvr42mJKkgddvMURgMBYQBrved4XbOUe2fAUgQFAt7k7EHT52YC0puDLdv8AxFgpZYiZjRRGnnXPGCeq1yCO4ec7FXHUqNPRhf5k+X2jK0cQuHS2twmGuhgGK5VYIV8Pw6ty5+KdwalawOJtAsoZWYr95IIYOASNB1IB6EER1O4fdS2mV1Z2nW4SGY9AdRP+9OlxeFuZbahUJ3ZpADBTBJJA325Vb4Aqwazadvl6ReH5QSrcF18Qe4+sxdziOKFvEvebMyKSpDTJzqJ+EdTyrLu4R+7yEkT4iW2CkgAbfz8vQ+0VgA3LRyuCg1BhWLXE2Kmco0G/I0PxTsvh7httaVQ7I48TXAG8MGXVoWDPLadjumooJsZ0FXS4mNs5PuQ7MzlMxGXQDXLDQQee/Tzq3DWxchVwjksx1W4fDDGSQynMDE6RW74b2Ns93YutDFPu2lWl/Ex2F0AABtdzCmhMFwm1kcLaUkG2VZWdhJu/mJlRvPtOlXSC0ycw3+A9IutSapqnmfIETE4mytvu82GvI7PlJFwHZgFnwefI1MYFrtoMljFI2WSe8XSW0BUgRpruNDXoPC+EA21XJlAF0kkZpDLoCDzVlJ160hw2BtW2EYdLlsg2g6W0IXMTAJiBJfNBJ2pnO072t5ekWMNWA96xH/Yjz+pgVu4yfZkuPfQmxbzC3cyeP7TZtjOpBk+MT5SPOrcBjHa7aR7l6Psq3P7QGX78jxSkmRoToYFNzdt4ZQHW2mZTyQlnEEHIoJgeEbQIHUUNxbFHCZLbd2txmtiAq+G0q3WP4fzaRr9TWcmne012qAXMK4pat/ZzduWVuOEG++pAHiIPWdqxWNwZxTKtjCFdDsAwnwHV8qjQPGp5edegdjOKviLFxbwgr3aDTL8Nq1m6Se8R58yau7SMbNl2sqoVFd1kz4it0mVgg6kH1+dDSUAHWFUctZpjrXYe6oFxns21Akh7gGsjcgZduSzR39UMRcBfDX7ZPO0HyPtssgBgT+LT22Dbs5xNMQ5DpbBbvO7kCTF64AAI/CiDXzo/FYc22yqyqzZAPw5jLyokjUxPnWoPTK3tr1zKVqcG0mZ4nw7EW8tt2vq4tsZl4AbSJzCG01gwY9qb8IW+bYCXWcrlBLXj+UGVUmRqYg/KNKP4xhHhrjhfCpXU5mMExGp2mP8AtXBZVRJdRI1KKRp4dDyPP5GkjJbpXjG53N0Ldv8AqJeJ9g8VduM/3auzFjn1WWMxmGogQNQRpuKScX4HiMLey3LAGZDtLAmRqMp0PQCT5Hatg/dgAA3mnoFXmfWqDct92wW2Nk1E+IkLmJIAMTO51phq02N9Rbq/2YohwLC1/j9hMTxG3cQBWtoS6BlUFwWklcoU7GVOhG8U3sdlcY9sBMOypr8TBfDIMhZzex8qaPjzmB0Qxpl0iSOe+08+tSv8acAFbj7CRmOpkyNSBtFRV5w3UEj5SufVF/cYA/P1AgNzsJfNpYQqSJJzSp1MHct8PkdT71luK8Mv4ZA96wVBeM3xIfS4JWT0JkTtyrWf1hvggZrkaCQ4HMTz00o67fvnODebK4ysrahl5htTPyrWMI52FvztmJ+U8PT3a/52TzRcUW8AAzSYEHfn9AKsTvDIVQTsqgEt6QNzXoWA4Yqgnuwv90+H1DKfodaIt3rtvVBDbZkYoY/a5Go2DYLe5PyEWnLNNqgXKAPibduundMlw3s1jyDcOH7tIB8SmToJ+7Lgj3ioPYIJBwoJnXQ78+v6064tjLtxijPcJjTvGbWOkxSPun5Zz5i2SD5gzqK4zub+533+k7IuRceFo/OBUuF8A8WXd+Z/uRPqa7awVkG4HcZlQlFFxXDOG2JSYAUEmfKsLi+L37lwsXYDNMKSABOm2/vVvZm6VZww3t3iPa0xj5Ka6D1KiWyMe+KFChUvnQd1p6JhcHdYC4gULEqczyYaDAW2TpoOVRx2Kuhc2txANWVzGWZ1MSQC371fdm+IouGMZ5AZyCGWD4TkUnLM5eR3NNMNxlN7ilIzCG1+LLGskcutIw+IrO/7hPeR9YytgsOlO1JQL/AH6G8zI4naEHKxb8qnKDPViST7AUJjeIhoEKPmT82JP6elH47gpfEvcVZt3Cpyk5CBKljtEfERBq/hvaWxhla2UVQGEqXJKsc0zM6eEbQNa6ftuVgGU995yv0oMCQw7FAmda5THgCyzt0AHzP+31pvbwlq8HuWu7BuePwPLANvoBBmOvOqTxC/aJsfZXCfAXFpWGWSJLjRVjWd/Ki/UgDYjxi35ELJYPv/AMfvGmEv2tmSeumYn6iKji8KrMq20cu2wCnWBJgbmKGwvBxbVhbJtnKVH3hA02JXLO/OZ86twBxaXQzMhVSSpF182o2ANvTpo1J/UQGJt4n7Rg5C/bClh/5AP1guNwF22DmtvGxUIWPuoBMe1AWu1aI4tlyqrmXYKF3kFZB3Eajc1srtx3MkMSd9j9efvQveLIWUDHZc6yfRZk0mpj6lXQqO71vNWH5HpYfUVG77DwtJcdl+F/csATdB0IAifEY260pw3GrFq2Fe4veiF1aM0EbzJHpHypkMWv4cx9EeP8zAD618czD+yJ3+I21265c9J5t2N8s2HEUkFs4iziHEC6WyQVZWBPdw4ZTMAlguhgHQ/rRF/HObS21slTmS4XRTq6qsGAIUeEczsNaLOcDUKp6SxjyOq9OlXJhG3N0xzAtqv7wE/WmjDvxAmY4+j/Ukxbi+GriLqvdsF2AjMGKACdfCtw+u1G8UTDFs+IawrHSbrKJ38MGJ56etGXMAkeMMw2OZ2bfkVLGPpVL8GstBNseHUGFjyHwkTtVey31Jk/UOAWK3dAfuu69Uw9xp91kGg+IYK9iBlLNlggr3OIhh/wBHT2IpjxDsrYykZV1Ekm2umh5aeegH+wR7MogPdnLtqpdOY10Pry5UwYXqPhAblDgR4xQ2EsjIpvpbZHOYKj2mifzuQRqSeW/lRGM4gb5C2r6ocytmBh1KhwTIuSZDmRHIa70wHCLyme/xMTEDEu2mkaNp9PerrmCxiklL11RsJWxcOm51Uk9Z2q+YYcRIMWh4Hw9YDxPE3LyoljEMUzw+ZgzkNkj4V1GhJliZ3qPae9exaqlvXI+SI0BAgyxnoPiA0JruIxOMc5bjLdy7M+HHXkVy70H3NwOVNjCsQdx31kkiOYu+XIDapzFQEGwl+10jpc9xl/a/FYpraWmJuFGGZittVZghB8UATuNNKI/4kWAt98MyqqlQIEgCRmtg5gCNCZ0AqvBd6jRb4bauMwBMYm4fc51bL6mK09zhCXbS/aLS23H4Ld52I5/GoQk+0UvM9K2nkY006eIBFz2EjymGvYx5f7pwqTmcIxXQxOeOfLY0VZx1lZDd0zQP/GtGesSdTygf7Vpb2AwdpYuLbAJn71gZPXx7n60E93BWwLlm1auPPhCMikHXXfQeg5004+o+gH54TOvJNCnrfy+oMR8QuB2/swpMmFZCYG5gRA9vSmuHxiNlXMM7KGyfiIPMLuRM6jpUL3ELjls+HGobU+KIU7HLrtG/OgMTjLd1g0gMARkZbqADK07NE9TvBPOKauNqJuB4zJiORqFf+x8PSOWUofxK0TzBgEAmOkkfOrk4iActxEc8vwN9N/lWUS2yOfGUAnNBIEBTuSx2k/TrVPa0WrNxB9puXnVA6kgNlDc1uFpUmOXlUOOJ3HnEryFTUdGoe0AjxmoxL2LhIXEFAR4rbZCIGp13OgM67TQHdONO/t6f/T3v4GKz2LxrKgZMTeuKYUgyF1jw/G2bcaCr/wCt2KGk7dc8+/jrFiMQrkEr33PpOnhcIcOCquR8go+hmmHCLA/+Ht+6KKlgcELJaAChzGMoDKMpmMo8Y8jETodhSg8cW7dTL3y2jALLbZRmkyQxGmnTmIgb1c+Pw9s5hZv3CZh3uMy/CZHiIA0nT9rlWZVPGdMsOAht5sK7Kj20YPGRzbDKxM6ByNG05xrpvpUl7IWYuLFxQ2Ulc+XVWERMkfEedZ8dpwAbVrBYe2jfEpKkEkR4kCsNRpvTDhVnGvZKXGuKIXu3AJKgOujZmhlgCQdQJ30VSyW2g5wdxNTheChJZUAncsxPKOeg0FQxWHVm+8W2xGuqo3yOtK+GYxVfurtzK4kDIVa3cMsTkNtZFwg62zrp4Z1ojh3aHC3mCJ3jP+XuzPOd5YgQZYAgQdahp3F5YqW0jO2ixodhoFyg+gBIAqF6w5Uxb0ymc91QQI18IUyY5T71Y+V5C2xmjfMGPrAg/MVWmHuw2VmiDIgx571ECnYXkfN/lbshdrh11v8AlqI2CEn5s8fMVFsGADnvv7ZUidtEXMB5npULuKuL4GYFRsM2bY6SNgdjVlnGZjAgt1MCfLUwa006tEGxFpz62HxRFw1x85XY4XZZgreIwsd62eZHIuTPtVmKW1bBCj4RrEADTWGGh9NdqnYujXwzO4BH1EzM855bcxNbIiQQY2BZvqIM+p3rYjoTpOXUpVQLMO+AG5BMAQOU6DT0JAg7jTXaiWukjLm1gETBGo32iN/419ewSkwUB6EQYPOTm1E7eEEnl1MKymqy0wcpUj16iQPamMRpE01NzFVmwCcqrIEyYInb8IHKekUW2YAEQNgR56Db0A8/OvreE8eqNr+HTTLsDB2I5+dFtbAYLA8QOnMEf3hrFUxhotouxmIcACdYkgAaZepOmo8x61P7SQTmifwrpJ25/OmRBEadZI9+kCNOlAuFUgeAZiSQ2WCeeszMcyPKgC3jy1txA7/EgTqwMyANoIGwjz/FrUVvAqGCkfmB5bbCdfI/yDL90EwApPmQBMct5P6xzqlQCCBc1bfUZQNIECI6yVHL3YosJndsxlblgSCCTuIOpMaSdOm3KjFBlSpA0P15BoJG8xVIsu5kDQREkzp5RA5kETU2KCZ8ZO4AAB9YEGl1ayJvH0MLWqbDTr/NZVhLbZjAnXcgzPMknWfMcuVGLZG9xpPNV0BPm25+lVDGNyWPr+tRD9Z+tYqmMZvd0nUocmU6eramFNfMQoCjoKBxxuZD3QUPyLgx7xXMTxO1bIFy4qk7A7/LkPM0Dc4jcdj3RtMo2hwD7xmJ/wAopKo76mbWdU0Ez3FLnESCj2kdT0VHHqA06+orNX+E4jXPaZfW1A+gFehXuL3EHjt8p0dBp5Z8n6V9h+1FogE4PFqDOtvJdGm50IP0ombJwHZACh+J7ZgOG4K6HBKMAFuSVDiZttG8jetJwLhVu4pI71m0ktEjvJWOhO/zHQ0Zj+Km9cK2mYWipBzOAWkblWOwPIHzMVMf2QDX8Si5YMLIUfsvanKRygTppUJuIIWxmc49i72GuNb7pJARg7AOcgJEMJIUkxPUR7KcPeuYq4gtWUa7lIYMbahtWI+JlEQTOk6DXWnPF+C2cIpdL6XGuiFstaW+9zSSWYhGSAZLECOfIViLeJe05MZVbpB9N6JDqDFOthab3iHA8bbtZTZs2o8SLmtH1GrajXz19aVvwi7J8FseSvbgeQ8W3SqsP2mu3LtoC7dtIoYkC6yhmgbpm0AJkTvT3/ipOpyE8yVBJ8yeZ86jIG4ygfhPsKmKWTawFpCJg95ZMxsRAB+cUBaGMxLA3XVCp0UreUTrsAhAO4mQdB1BLl3DArMTzByn2O9AWOzV5pzY66QdvEZj/NB08qyK83OnVG+MfE2bAuSFIVc5MSxMAkMhFwmdySaCs4a7dW4bmJUSAsswXIQysRnbx/CCZ1HME0l/q0LTsb9y3cXWPv8AIx0/JlYzH4feRRNnGWETIpdBmYyjlXVSsQreLfTbl86ctzEtYT7jWEw1hJu3Gu3G+EEuQBMyt0hV31/FPpNJTxV7rq5dxBAFwQXGvxFgBmPvGnzKw9iwzkmT+1KNcInfWMxiNJUmdK054dhLE5i7GNZAte6tcYEgfsk/pVmUItHG8RfTuyRmzR3jibVxPEDAIItOTlHhgdNdKd9n+M3bxe3faLwmLZBDZddVzEkjrz9tlGJ7UWVbNasqzT8WVnkD9q4bYU+gcUv4lfxWJKMbcFdbTMcrLrMW2AtryGmVjAqAAbiWWJ4z0dyuaGdAzahWaWO2yyT02FSPcnRiW9NP0lo9uVY57dp8Q1m8hLOXZUU3BbZcxjNakJnIIMmQ08j8X1jtBZtE93ZD4cBTNsC0yzuWtbss/iBEc96IsLfaQAk/eaZwJOUBRManp9fOuC6wMT89f+1VYfi+FdRczCCwUKoYEsdl8UAEjbxawYmmGH4pbYTZDARI+7ZD7lxJ9opINOx3BjTnvwMiMVDSw8Q01AaJ8mGlEpxBGABCkjYmAR/mBn50uGZt5zHfc/xP6193Gup/ifl/rFFTrVb2XWBUw1BhdhaM8PaQMSTq/iOYKsHTmBqPPT05Vcl0J8ToQJ3E6eRA1mKQAsuzEfz/ADvRVnFMNSJ6EaH5j/StXtbD+QTAeTVI/ab6+kbbEEttMErsDsPgg78uh2oUIIMOggyR8OaNx4d9QefP50nirGAGOm2YA/U1T3vofoJPltTDi0AuIkcm1C1jtCbqzMMza7sY09j06/wqLXR1zn1n3mqVJO4Jqwt+yPpWSpinbSdGjgaVPW1zOPfeIIEegn570s4rxizhxNxvFGiDVj7ch5mj/mP0+u1Z3tB2VS7L2iiXCdQxyq55zEw3oNenOkoMx1mhzlXoyj+vacrDH1cD/wDU1Y3bVolcPBO0uSNtNlHymhG7CLl/tmDczAyz5LvHv/pQGI7I4pNbdy246SyH5bfM1t9my/1vMftBPGQxXGbt1891LL6AQUA0BJ0YhiNzUk+8Rmt4C4csAm0zuAT11IGmui0txOExlv48O5HUAXB+7/GjeFdtMTh1CI4VRr3bIuhLc9A0nfflQVSFHRGsKmMx6R0glvity22XLetsfhUiZ6ArlWdfL2ppduO+UEpyMIpQtmGkgCPaefPenWF7fvcUi7YtOcumpiSQBKnNI1kiRoDSq2l3LIDBGPiYKSrEHXZYieXrQLVZh0tIbUlG2sPsYa4pGceEAhcro2UNv4A2Yz0POOlU8MwVq5fS0t0+IsGlO6ZVCkmPE0mARt7URhwqqFtPZuAQIZQLhChQskNmMka6c22O7Ds3wdl8d9A8PANwliVyPKgFRAlx5H2oS3XLy32hXGewFhyO9u3ZOp8SESQOTLI/3FKMR2FwthWufeFlBKszMygxoWW2qsV6xyrWnIlx8ltV+FWygLOQRBgcjNWJeQbL8hSmc3jVpi08ru8Qwfc6WLP2jUQtoFBBMElmmCoB6jWkRxTf/LYb/oCtnjL2KujKt8AbGSxPrMjXT9asVboEG+JGh+9jby5VfPAcPGLam99IXh+0FgLtr5wRv+YcomnmD4zhCI7+3rpBZRM+R36V5Ng30LL1jTrovy186Nu2iII3WCNPTXy1/Sl5ATaHzpnoOL7F4RrhuBmtjcqhULPUAqcvtFJON9nsIINrFoGGhS9dJB13B1KsOmUjyrSYDEm4ivBGYAwRBnnoaB7Q8Cs34ZnFq4PxiJI6EEifXlVKxvqYbILaCJhicKoAc4UMsa2bVwkkftXEZY8oiguOcfwzplt94WzAksfDEHYSY8RB2G1Fv2RwpkNfaY0bNb35HLl28poDh3BLlpyPs1jEAaSbqwRyZQWlT1Ugg8iObAV3iyG6oXwS8jwiC2rFSc4RrhhRJlUK3c3lmKk7dKI41xS3hUJy3LjP+ci0p5nNbt/eH0ua+dGW+FlQzNOHTKxY2bIVU+7cZw4zMDB5QKVcH4BhrmZ77m8SD43ZVKakA3Ea6rHSGnMw18tTQhjpAe6xfi8VicRce3aaEjMUWFlcolmVAS5mdWINNMBwBhat3bjkqO7bKLaW1AYqPExAZ9GOpJ3qFx8MbndW7NhrgaBfckq0AAEKkgzG0vq2k6UDxLGAErdxBugRFtGYKII07vkAARBNs1HUnjCRgDtI8UujCMrYe4rZhF2x8Q0AmSv4iZMbqToRFbThfGRdUxbK3F0uW30ZDpy/ENRDDrqAdKxGD7zEnJh8MuQSSQqmYgZc58MnpcLESTrFMsDwHu7veYjE/eLqbOHAYqpk5XZhltIQCCGgHrRKo0zC8oseBmu71jp15RH0H+9XmzkANx1tgmBmIBJPIDcny3pAvaBjNvCJpBjIc5giVLX3BRRJgZVuroNRtQ6cPvOxZ7hE7hCxJEzDXiS5HIqDl6AbUxsQq6CAtJm1mqfHYe0YLIW1+MidN/B/6ooJuJd6WOpAaF1G2RDpAGkk9djr0BwnD1tADIqL5dPMjWPWj7bqYgwOsafOsdSqX3mynSCyyyfarComZNUldNB9a+CHrFLEOEhRXGukcpqAu8t66bgnzooMA43xu1hree6SJ0VY1Y9ByHqYrz7ifa+7e0KWwk+FYzRIInMdz5wK9QvrpBiD/O1I8Z2WwlzVrKr5p4D6wuh9xTUdRuIp1ZtjMbgu1mQAHvF80eR6lXDA+0U1t9tAAIYXNdQU7tvXRiCPQTrtUcX/AEeA62r8DktwT+8sf+Ws/juyWLtz9yXHW2c/7vxfStCVv8WmdqR4ialu2OaAiICeTuVPsMgqrEceuXFYXMPaIjQsyvMkDRDqYmfQGsIjNbcBgywQWXUGOkHafSnnCePWbaBGV1MkmEtPbEkmBbcMYAgSCDvz1LjXe1okU1vHeF4FdXe0MzA5RGWYG4RB8MagjTy5FrYxv3gV8HctOTH3BZdYIga5Ynz5HzpJa4zh1kpeCtG9pb9pp/unMjDyBWjMR2m7y13YxBuAkStxEtEQNSHzCekHkedZjdjrNAIA0l/FeKgFAjsB4s4xSKGBXQDNElZDBteRHWtvwvhgt+ahi+0AAohMD/DWS7NY1jcS0UzIxXNuYUsACShUMJgSwb6Vt7/Fb2VUOCMMGLO1xYUkeE5Q2bUTK6RFCQvXLBPVFYVpObmZnXmatQLoc0ajc/xrN8Z4hcOZVu2tQRAJn/OBl2GsaidqzE4gSyABNvC0qQxkgHczvG+oOs0sLeNL2jtkHiVgOuh5df5FK/8A2fzAnno3+tZjFYq4CCysoPxSunkJG8ac9zUTj2/KT5661Yp2i2rX4SeBvQMoGx+e5n9P8tbTswUuXINsOYkMQCAPIHbUetYDAvmcDUEMFEHmc3zp5h8e2HOYE59RpEaaR9N+dC+h0iw1t56Rbew7ZVyEjoo5bxprFXhUUiAJ+VYThPFXXnJJiT5mPX8f8xW5sksojfqevOkXN7GaKT5t4Sr0l452sfCEThiynZy8L6aAmfIx5UyxL5Brv5Utv3luAo65lYQQdjRC19Y0gkaRJif6QsQwOVbag9FLH94wflWUxHEy55DkIhFHkEUBV9hW14f2Ywi6m27/AN52/QQD8q7xvsxaZc+HVbNxRHwgo4MyHTUGRImPWaerop0EQyORczI4HCXmIK2Llwb6I5U+rAdOhrRYDDgNbe/ZVka2zJ3xzfCrEDNbDFl0HhZSRMATrQeA4jjQgtpdVU6ZizIsahHZSQv7JmNgwrQcG4CA4dlDTOd2uMzEMrAiCvi8TT4mMa1bPbeCqg7SP2rEYgZbCzbHkbFpRy8Ct3jgbHM6jqmsVfg+y8gd+3eBYK21hLawZEKoCgg8wATzJp09sKBGkbQSI6QeVRXikaONOo39xoG+h6k0pqjNtpHCkF+MJs4RAIAUDkoED5VB0Ubb1LEqVMTrAPs23vVbXPDJFJOmhjhrqJAjzqgYdJk6Hy0/Tf3oi1iQ2kV24mkmrEhgZDKfzDrsfpoT8qsXFDYka/m0+uxPoTUblyKrNyQYHzoryoUddhXRp0paARqjFfLl7Dl7V1saUy5hJaII89tDtv1qwJRh+brJ8q6F5kVC3eA3Gv8ArV8g8o/n6VV5crZ43rucGqrqHmflUrdo9akqLOJYDvr6m5YFy3btnIGK5WuOfFmGreFVEaH4z0oDEdisIyj40cblTIJ/uNIA8hsK016V3j1oU3JNMDnhFlFO8xjdjXtkFBYvKDs4uWmI1gZlYg+8cqG43bC2u7HDjbvOcqMCXWARmYFWjbqOdb4Md96tBkUXOHjBNMcJl+xnD1W2JS4tx7oIzW3XKiMAssRCkhS0j80eVavjXDwQSt11Z/EZhxpopgjoDrUlXp/M7Vzi9/xsvIQo9AB/GagN7mS1rCZ3A8FdHzLdCSIlRmzeeU+FfaTroRXeNJdsd24uZ1GVHZlk6NIZiXM6xv05U1bevgal+uUVHCKr+NuBWm2AX1OWzlE8g5CFmEQdZ9SKoRrkCMOkRp4re30/QVord4xBnnVZvmruJVp//9k=',
  }]

  const [reviews, setReviews] = useState<{ accommodation_id: number; created_at: string; rating: number; review_id: number; review_text: string; user_id: number; }[]>([]);
  useEffect(() => {
    accommodation();
  }, []);
  async function getReviews() {
    const { data } = await supabase.from("reviews").select()
    setReviews(data as { accommodation_id: number; created_at: string; rating: number; review_id: number; review_text: string; user_id: number; }[]);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Friendly Places</Text>
      <SearchBar
        placeholder="Enter a city!"
        onChangeText={updateSearch}
        value={search}
        lightTheme
        round
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
      />
      <FlatList 
        data={dummyData}
        renderItem={({item}) => <AccommodationListItem accom={item}/>}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10}}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to flex-start for better layout
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Added marginBottom for spacing
  },
  searchContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInput: {
    backgroundColor: '#e0e0e0',
  },
});
