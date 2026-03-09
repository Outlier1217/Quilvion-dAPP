Quilvion-dAPP - Decentralized E-Commerce Platform
🚀 Core Idea
Traditional e-commerce platforms suffer from several critical issues:

Users must create separate accounts on every website

Repeated sharing of sensitive personal information

Increased spam, data leaks, and identity theft risks

Cumbersome login/logout processes

Fragmented user experience across different stores

Quilvion-dAPP completely revolutionizes this model by making wallet = identity.

How It Works
Connect Wallet = Login - No account creation, no passwords, no email verification. Just connect your Web3 wallet and you're ready to shop.

Unified Shopping Experience - Buy anything from anywhere using the same wallet. Digital products? Physical goods? All in one place.

Privacy First - Buyers only share personal information (name, address, phone) when absolutely necessary for physical delivery, and can erase it after delivery.

Merchants Register Once - Sellers provide their business details once, get approved by admin, and can list products immediately.

Built-in Security - AI-powered fraud detection, escrow for physical products, daily spending limits, and multi-sig style admin approvals for high-value transactions.

🛠️ Technology Stack
Blockchain & Smart Contracts
Network: SKALE Testnet (Chain ID: 324705682)

Smart Contracts: Solidity ^0.8.20

Framework: Hardhat

Payment Standard: X402 (experimental payment protocol)

Token: USDC (mock for testing)

Backend
Framework: FastAPI (Python)

AI/ML: XGBoost fraud detection model

Database: PostgreSQL

Blockchain Interaction: Web3.py

Event Listener: Custom Python listener for on-chain events

Frontend
Framework: React + Vite

State Management: Redux Toolkit

Web3 Integration: ethers.js / Web3.js

Styling: Custom CSS

AI/ML Components
Model: XGBoost Classifier

Features: 28 PCA-transformed features + Amount + Time

Output: Risk score (0-100) for transaction fraud probability

Integration: Real-time risk assessment for each order

📁 Project Structure
text
Skale-dAPP/
│
├── contracts/                 # Smart Contracts
│   ├── core/                  # Core business logic
│   │   └── CommerceCore.sol   # Main escrow/commerce logic
│   ├── config/                # Configuration management
│   │   └── ConfigManager.sol  # Platform settings
│   ├── security/               # Access control
│   │   └── Roles.sol          # Admin/Bot roles
│   ├── interfaces/             # Contract interfaces
│   ├── libraries/              # Helper libraries
│   │   └── PaymentLib.sol      # Payment processing
│   └── mocks/                  # Test tokens
│       └── ERC20Mock.sol       # Mock USDC
│
├── backend/                    # Python Backend
│   ├── main.py                 # FastAPI application
│   ├── listener.py             # Blockchain event listener
│   ├── fraud_model.pkl         # Trained XGBoost model
│   ├── requirements.txt        # Python dependencies
│   └── uploads/                 # Product image uploads
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── store/              # Redux store
│   │   ├── hooks/              # Custom React hooks
│   │   ├── abi/                # Contract ABIs
│   │   └── assets/             # Static assets
│   └── public/                  # Public files
│
├── scripts/                     # Deployment scripts
├── test/                        # Contract tests
├── ignition/                     # Hardhat deployment modules
├── .env                          # Environment variables
└── hardhat.config.js             # Hardhat configuration
💡 Smart Contract Architecture
Key Contracts
1. CommerceCore.sol (Main Contract)
Order creation and management

Escrow functionality for physical products

Integration with X402 payment standard

Role-based access control

Platform fee deduction (configurable)

2. ConfigManager.sol
Dynamic platform settings

Daily spending limits

Admin approval thresholds

Refund windows

Platform fee percentage

3. Roles.sol
DEFAULT_ADMIN_ROLE - Full platform control

ADMIN_ROLE - Can approve orders, merchants, products

BOT_ROLE - On-chain bot for risk scoring

4. EscrowLogic.sol
Daily spending limit tracking

Buyer activity monitoring

Order Flow
text
1. User connects wallet
2. Selects product
3. Smart contract checks:
   - Daily limit
   - Product type (Digital/Physical)
   - Amount threshold
4. USDC transferred to contract
5. Order Status:
   
   DIGITAL + Small Amount → Auto Complete → Funds to Seller
   DIGITAL + Large Amount → ESCROW_HOLD → Admin Review
   PHYSICAL → ESCROW_HOLD → Admin/Manual Release
   
6. AI Bot (Listener) assigns risk score
7. Admin approves/releases or rejects
8. Platform fee automatically deducted
🤖 AI Fraud Detection System
How It Works
On-chain Listener (listener.py) continuously monitors for OrderCreated events

When new order detected, listener extracts:

Transaction amount

Buyer/seller addresses

Product type

Sends transaction data to AI endpoint (/risk)

XGBoost model predicts fraud probability

Risk score (0-100) assigned to order via setRiskScore()

Based on score + product type:

Low risk (<70) + Digital → Auto approve

High risk (≥70) + Digital → Manual review

All Physical → Manual review

Model Details
Algorithm: XGBoost Classifier

Training Data: Credit card fraud dataset (PCA transformed)

Features: 28 anonymized features + Time + Amount

Output: Probability score → Scaled to 0-100 risk score

🔐 Security Features
ReentrancyGuard - Protection against reentrancy attacks

Pausable - Emergency pause functionality

SafeERC20 - Safe token transfers

Role-Based Access - Granular permissions

Daily Limits - Prevent excessive spending

Escrow System - Funds held until confirmation

AI Risk Scoring - Real-time fraud detection

Multi-sig Style Approvals - Admin required for high-value/large transactions

🗄️ Database Schema
Tables
users
wallet_address (Primary Key)

username (Unique)

profile_image

created_at

merchants
wallet_address (Primary Key)

name, company_name, address, email

product_type

approved (Boolean)

created_at

products
id (Primary Key)

wallet_address (Merchant)

title, description, image_url

price, product_type

download_link (For digital products)

approved (Boolean)

created_at

orders
id (Primary Key)

order_id_onchain (Unique)

buyer_wallet, seller_wallet

product_id

status, amount, risk_score

tx_hash

created_at

messages
id (Primary Key)

sender_wallet, receiver_wallet

message, is_read

created_at

platform_settings
id (Single row)

daily_limit, admin_threshold, platform_fee_bps

updated_at

🔄 On-chain/Off-chain Interaction
Event Listener Flow
text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Smart Contract │────▶│  Event Listener │────▶│   AI Service    │
│  OrderCreated    │     │  (listener.py)  │     │   /risk endpoint│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                 │                         │
                                 ▼                         ▼
                         ┌─────────────────┐     ┌─────────────────┐
                         │   setRiskScore  │◀────│  Risk Score     │
                         │  (Transaction)  │     │  Calculated     │
                         └─────────────────┘     └─────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Auto Approve if:         │
                    │ Digital + Low Risk       │
                    └─────────────────────────┘
🧪 Deployment
SKALE Testnet Deployment
bash
# Contract Addresses (SKALE Testnet)
CommerceCore: 0x78c37Dcb5C3C072DAfb9D4e28638BBcdf297FeeB
USDC (Mock): 0x...
X402: 0x...
Environment Variables (.env)
env
# Blockchain
PRIVATE_KEY=your_private_key
RPC_URL=https://testnet.skale.network/
COMMERCE_ADDRESS=0x78c37Dcb5C3C072DAfb9D4e28638BBcdf297FeeB

# Database
DATABASE_URL=postgresql://user:pass@localhost/skale_db

# AI Service
AI_URL=http://localhost:8000/risk

# Admin
ADMIN_WALLET=0xAb06a17af1425F499E302B639c69f8ce29a967E0
🎯 Key Features Implemented
✅ Wallet as Identity - No username/password
✅ Digital Products - Instant delivery with download links
✅ Physical Products - Escrow + Delivery confirmation
✅ Merchant Registration - Admin approval workflow
✅ AI Fraud Detection - Real-time risk scoring
✅ On-chain Bot - Automated risk assignment
✅ Platform Fees - Configurable fee percentage
✅ Daily Limits - User spending caps
✅ Chat System - Buyer-Seller communication
✅ Admin Dashboard - Full platform control
✅ Product Approval - Admin moderation
✅ Image Uploads - Product images
✅ Order History - Complete transaction records
✅ Escrow Management - Release/Reject by admin
✅ X402 Integration - Experimental payment standard
✅ Multi-role Access - Admin, Bot, Default roles

📊 Admin Capabilities
Approve/Reject merchants

Approve/Reject products

Release/Reject escrowed orders

Update platform settings (fees, limits, thresholds)

View all users, merchants, products, orders

Monitor platform statistics

View all messages and support requests

💬 Chat System
Real-time messaging between:

Buyers and Sellers (for delivery coordination)

Users and Support

Unread message indicators

Conversation history

Mark as read functionality

🚧 Future Enhancements
Multi-token support (ETH, SKL, other ERC20s)

Decentralized delivery tracking

Reputation system for sellers

Dispute resolution mechanism

Mobile app (React Native)

More sophisticated AI model (deep learning)

Batch order processing

Subscription-based products

NFT integration for digital goods

DAO governance for platform settings




🏁 Conclusion
Skale-dAPP represents a paradigm shift in e-commerce. By making wallet the primary identity, we eliminate account fatigue, reduce data leakage, and create a truly decentralized shopping experience. The integration of AI for fraud detection maintains security without compromising user privacy. Support for both digital and physical goods makes it practical for real-world use.

The platform is production-ready on SKALE testnet and demonstrates how Web3 can solve real problems in e-commerce: privacy, security, and user experience.


📞 Contact
Email: mustakaalam10@gmail.com 

Developer: Mustak Aalam

Live Demo: 

Built with ❤️ 


