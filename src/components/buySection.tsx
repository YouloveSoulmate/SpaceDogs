import { useState } from "react";
import { SolanaInput } from "./solanaInput";
import {WalletMultiButton, WalletConnectButton, WalletDisconnectButton} from "@solana/wallet-adapter-react-ui";

import { SendSOLToAddress } from "./sendSolButton";
import { SpacedoggsInput } from "./spacedoggsInput";

const HOST_WALLET = "QTju7qbq7MSTdFdp4e5e6xjY7TydaHJKnMaKiKM3UZr";
const MIN_SOL = 1/10000000;

export const BuySection = () => {
    const [value, setValue] = useState(0);
    const [isBuyButtonValid, setBuyButtonValid] = useState(false);

    function inputCallback(value : any, isValid : boolean) {
        setBuyButtonValid(isValid);
        setValue(value);
    }

    return (
        <section className="left buy-section">
            <h2 className="buy-txt">Buy now</h2>
            <p className="plasholder">Amount in SOL You Pay:</p>
            <div className="input-group flex-nowrap">
                <span className="input-group-text bg-dark border-secondary " id="addon-wrapping">
                    <img className="solana-icon" src="./FILES/solana_icon.png" alt="solana_icon"/>
                </span>
                <SolanaInput value={value} callback={inputCallback} minValue={MIN_SOL}/>
            </div>
            <p className="plasholder">Amount in $SPACEDOGGS  You Receive:</p>
            <div className="input-group flex-nowrap">
                <span className="input-group-text bg-dark border-secondary" id="addon-wrapping">
                    <img className="token-icon" src="./FILES/doggs_token_icon.png" alt="solana_icon"/>
                </span>
                <SpacedoggsInput value={value} minValue={MIN_SOL}/>
            </div>
            <WalletMultiButton/>
            <WalletDisconnectButton/>
            <SendSOLToAddress className="wallet-adapter-button send-sol-button" receiverAddress={HOST_WALLET} amount={value} minSol={MIN_SOL} isValid={isBuyButtonValid}/>
        </section>
    );
}