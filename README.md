## Для запуска
1. Установите [Node.js](https://nodejs.org/en) 
2. В папке проекта запустите команды
	2.1. `npm install`
	2.2. `npm start`
3. В браузере откройте `localhost:3000`.

## Внесение изменений
Все блоки кода, кроме **How to buy** остались нетронутыми. Чтобы редактировать их вносите изменения в `/public/index.html` .

Блок **How to buy** сделан в виде React-элемента (`buySection.tsx`). В секции присутствуют 5 React-элементов:
- WalletMultiButton
- WalletDisconnectButton
- SolanaInput
- SpacedogsInput
- SendSolButton
Из них WalletMultiButton и WalletDisconnectButton являются сторонними и содержат баг - они не принимают другие классы. Поэтому с помощью Bootstrap их будет сложно кастомизировать. 
