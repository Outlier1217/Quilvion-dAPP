# 🛒 Quilvion-dAPP
### Decentralized E-Commerce Platform

A next-generation **Web3 commerce platform** where **wallet = identity**.  
No accounts. No passwords. Just connect your wallet and start shopping.

---

# 🚀 Core Idea

Traditional e-commerce platforms suffer from multiple critical issues:

- Users must create **separate accounts** on every website
- Repeated sharing of **sensitive personal information**
- Increased **spam, data leaks, and identity theft risks**
- **Cumbersome login/logout processes**
- Fragmented user experience across different stores

### 💡 Solution

**Quilvion-dAPP** revolutionizes this model by making:

> **Wallet = Identity**

Users simply connect their wallet and can interact with the entire marketplace without creating accounts.

---

# ⚙️ How It Works

### 1️⃣ Wallet Login


Connect Wallet → Automatic Login


- No email
- No password
- No account creation

Your **Web3 wallet becomes your identity**.

---

### 2️⃣ Unified Shopping Experience

Users can buy anything using the same wallet:

- Digital Products
- Physical Products
- Services

All purchases occur within a **single decentralized ecosystem**.

---

### 3️⃣ Privacy First

Sensitive personal information (address, phone, name):

- Shared **only when required**
- Used **only for delivery**
- Can be **deleted after delivery**

---

### 4️⃣ Merchant Registration

Merchants:

1. Register once
2. Submit business information
3. Get admin approval
4. Start selling instantly

---

### 5️⃣ Built-in Security

Security layers include:

- AI fraud detection
- Escrow payments
- Daily spending limits
- Admin approvals for large transactions
- Role-based access control

---

# 🛠 Technology Stack

## Blockchain

| Component | Technology |
|--------|-------------|
| Network | SKALE Testnet |
| Chain ID | 324705682 |
| Smart Contracts | Solidity ^0.8.20 |
| Framework | Hardhat |
| Payment Standard | X402 |
| Token | USDC (Mock) |

---

## Backend

| Component | Technology |
|--------|-------------|
| Framework | FastAPI |
| Language | Python |
| Database | PostgreSQL |
| Blockchain Interaction | Web3.py |
| Event Listener | Python Worker |

---

## Frontend

| Component | Technology |
|--------|-------------|
| Framework | React + Vite |
| State Management | Redux Toolkit |
| Web3 Integration | ethers.js |
| Styling | Custom CSS |

---

## AI / Machine Learning

| Component | Technology |
|--------|-------------|
| Model | XGBoost Classifier |
| Features | 28 PCA features + Amount + Time |
| Output | Fraud risk score (0-100) |
| Integration | Real-time order risk analysis |

---

# 📁 Project Structure


Skale-dAPP/

contracts/
├── core/
│ └── CommerceCore.sol
│
├── config/
│ └── ConfigManager.sol
│
├── security/
│ └── Roles.sol
│
├── libraries/
│ └── PaymentLib.sol
│
└── mocks/
└── ERC20Mock.sol

backend/
├── main.py
├── listener.py
├── fraud_model.pkl
├── requirements.txt
└── uploads/

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── store/
│ ├── hooks/
│ ├── abi/
│ └── assets/
│
└── public/

scripts/
test/
ignition/

.env
hardhat.config.js


---

# 💡 Smart Contract Architecture

## Core Contracts

### 1️⃣ CommerceCore.sol

Main platform contract responsible for:

- Order creation
- Payment escrow
- Order settlement
- Platform fee deduction
- Role-based permissions

---

### 2️⃣ ConfigManager.sol

Manages platform configuration:

- Daily spending limits
- Admin approval thresholds
- Refund window duration
- Platform fee percentage

---

### 3️⃣ Roles.sol

Role-based access system.

| Role | Permission |
|-----|-------------|
| DEFAULT_ADMIN_ROLE | Full platform control |
| ADMIN_ROLE | Merchant/product/order approvals |
| BOT_ROLE | AI bot risk scoring |

---

### 4️⃣ EscrowLogic.sol

Handles:

- Spending limit tracking
- Buyer activity monitoring
- Escrow release logic

---

# 🔄 Order Flow


User connects wallet

User selects product

Smart contract validates:

daily spending limit

product type

amount threshold

USDC transferred to contract


### Order Outcomes

| Scenario | Result |
|--------|--------|
| Digital + Small Amount | Auto Complete |
| Digital + Large Amount | Escrow + Admin Review |
| Physical Product | Escrow Hold |

---

# 🤖 AI Fraud Detection

## How It Works

1️⃣ Smart contract emits **OrderCreated event**

2️⃣ Event Listener detects the event

3️⃣ Transaction data sent to AI service

4️⃣ AI calculates fraud probability

5️⃣ Risk score assigned on-chain

---

## Architecture


Smart Contract
│
▼
Event Listener
(listener.py)
│
▼
AI Service (/risk endpoint)
│
▼
Risk Score Calculated
│
▼
setRiskScore() Transaction
│
▼
Auto Approval Logic


---

# 🔐 Security Features

- ReentrancyGuard
- Pausable contracts
- SafeERC20 transfers
- Role-based access control
- Daily transaction limits
- Escrow protection
- AI fraud detection
- Multi-admin approvals

---

# 🗄 Database Schema

### Users

| Field | Description |
|------|-------------|
| wallet_address | Primary Key |
| username | Unique |
| profile_image | Optional |
| created_at | Timestamp |

---

### Merchants

| Field | Description |
|------|-------------|
| wallet_address | Primary Key |
| name | Merchant Name |
| company_name | Company |
| approved | Boolean |

---

### Products

| Field | Description |
|------|-------------|
| id | Primary Key |
| wallet_address | Merchant |
| title | Product name |
| price | Product price |
| product_type | Digital / Physical |

---

### Orders

| Field | Description |
|------|-------------|
| id | Primary Key |
| order_id_onchain | Unique |
| buyer_wallet | Wallet |
| seller_wallet | Wallet |
| amount | Order value |
| risk_score | Fraud score |

---

# 🧪 Deployment

## SKALE Testnet Contracts


CommerceCore
0x78c37Dcb5C3C072DAfb9D4e28638BBcdf297FeeB


---

## Environment Variables


PRIVATE_KEY=your_private_key
RPC_URL=https://testnet.skale.network/

COMMERCE_ADDRESS=0x78c37Dcb5C3C072DAfb9D4e28638BBcdf297FeeB

DATABASE_URL=postgresql://user:pass@localhost/skale_db

AI_URL=http://localhost:8000/risk

ADMIN_WALLET=0xAb06a17af1425F499E302B639c69f8ce29a967E0


---

# 🎯 Features

### Platform

- Wallet as Identity
- Digital product delivery
- Physical product escrow
- Merchant onboarding
- Platform fee management
- Admin dashboard

### Security

- Fraud detection AI
- Daily limits
- Escrow protection
- Role-based control

### User Experience

- Product listings
- Order history
- Messaging system
- Image uploads

---

# 💬 Chat System

Supports messaging between:

- Buyer ↔ Seller
- User ↔ Support

Features include:

- Unread indicators
- Conversation history
- Mark as read

---

# 🚧 Future Enhancements

- Multi-token payments
- Decentralized delivery tracking
- Seller reputation system
- Dispute resolution system
- Mobile app (React Native)
- DAO governance
- NFT-based digital products

---

# 🏁 Conclusion

Quilvion-dAPP represents a **paradigm shift in e-commerce**.

By making **wallet the primary identity**, the platform:

- Eliminates account fatigue
- Reduces personal data exposure
- Enables seamless Web3 commerce

AI-driven fraud detection ensures **security without sacrificing decentralization**.

---

# 📞 Contact

**Developer**

Mustak Aalam

📧 mustakaalam10@gmail.com

🎥 Demo  
https://youtu.be/Y8hazlUdoXQ

---

Built with ❤️
