import { Buffer } from 'buffer';
import { WalletNotConnectedError, WalletSendTransactionError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction, Connection, clusterApiUrl } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';

type TransactionButtonProps = {
    className? : string,
    receiverAddress : string,
    amount : number,
    minSol?: number,
    isValid: boolean, 
}

export const SendSOLToAddress = ({minSol = 0, ...props} : TransactionButtonProps) => {
    const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=76231b54-ab0d-4d6f-b4e2-c6ba486d49c4", "confirmed");

    const { publicKey, sendTransaction } = useWallet();
    const sendToAddress = new PublicKey(props.receiverAddress);

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        if (isNaN(+props.amount) || +props.amount <= minSol) {
            console.log("Can't do this :\\");
            return;
        }
        
        // let balance = await connection.getBalance(publicKey);
        // console.log(balance);

        const lamports = props.amount * 1000000000;
        
        console.log(lamports);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: sendToAddress,
                // toPubkey: Keypair.generate().publicKey,
                lamports: lamports,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        console.log("wait to confirm");

        try {
            const signature = await sendTransaction(transaction, connection, { minContextSlot });

            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        }
        catch (e) {
            console.error(e);
        }
    }, [publicKey, sendTransaction, connection]);

    return (
        <button className={props.className || ""} onClick={onClick} disabled={!publicKey || !props.isValid}>
            Buy now!
        </button>
    );
};