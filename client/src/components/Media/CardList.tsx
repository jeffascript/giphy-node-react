import React, { FC } from 'react';
import styled from '@emotion/styled';
import DATA from './data.json';
// interface Props {

// }

const StyledLI = styled.li`
    position: relative;
    vertical-align: middle;
    /* display: inline-block;
    list-style: none; */
    display: flex;
    flex: 1;
    width: 200px;
    height: 120px;
    background-color: black;
    transition-duration: 0.5s;
    overflow: hidden;
    margin: 2px;
    /* cursor: pointer; */

    width: 32%;
    padding-bottom: 18%; /* 32:18, i.e. 16:9 */
    margin-bottom: 2%; /* (100-32*3)/2 */

    .bg-img {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center top;
    }

    &:hover {
        transition-delay: 0.5s;
        width: 400px;
        height: 250px;

        div {
            .content {
                transform: translateY(0) translateX(-50%);
                transition-delay: 0.75s;
                opacity: 1;
            }
        }
    }
`;

const StyledDescription = styled.div`
    color: white;
    text-decoration: none;
    /* cursor: pointer; */
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    z-index: 2;

    .content {
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateY(100%) translateX(-50%);
        transition-duration: 1s;
        opacity: 0;
        padding: 40px 10px 10px 10px;
        width: 400px;

        h2 {
            font-weight: 300;
            color: white;
            font-size: 30px;
        }
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
    max-height: 100vh;
    padding: 2rem 0;
    margin: 0 auto;
    width: 100%;
`;

const StyledImg = styled.div`
    margin: 10px;
    border: 3px solid #000;
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.3);
    max-width: 23vw;
    transition: all 250ms;

    & > div > div.pointer {
        cursor: pointer;
        font-size: small;
    }

    p {
        transition: all 250ms;
    }

    &:active,
    &:focus {
        // $focus-height: $item-height * 1.01;
        outline: none;
        // height: $focus-height;
        // margin: (($focus-height - $item-height) / 2) * -1;
        transform: scale(1.025);
    }

    &:hover {
        // $hover-height: $item-height * 1.5;
        background: var(--dark);
        // height: $hover-height;
        // margin: (($hover-height - $item-height) / 2) * -1;
        // flex-grow: 2;
        transform: scale(1.5);
        z-index: 10;

        p {
            transform: scale(0.75);
        }
    }
`;

const CardList: FC = (props) => {
    return (
        <>
            <StyledContainer>
                {DATA &&
                    DATA.length > 0 &&
                    DATA?.map((d) => (
                        <>
                            {/* <StyledLI>
                                <div
                                    className="bg-img"
                                    // style="background-image: url('https://www.youtube.com/watch?v=oRGEOtcZc0o');"
                                ></div>
                                <StyledDescription>
                                    <div className="content">
                                        <h2>Orange is the new black</h2>
                                    </div>
                                </StyledDescription>
                            </StyledLI> */}
                            <StyledImg>
                                <img src={d.url} width={150} height={120} />
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="pointer ">Copy</div>
                                    <div className="pointer">Bookmark</div>
                                </div>
                            </StyledImg>
                        </>
                    ))}
            </StyledContainer>
        </>
    );
};

export default CardList;
