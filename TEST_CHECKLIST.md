# QA / TEST CHECKLIST

## Wallet Integration
- [ ] **Detection**: Does UI show "Connect Phantom" if extension is installed?
- [ ] **Redirect**: Does it link to phantom.app if not installed?
- [ ] **Connect**: Clicking connect prompts the extension popup.
- [ ] **Display**: Address truncates correctly (e.g., `Abc1...xyz2`).
- [ ] **Disconnect**: Clicking address -> Disconnect clears state.

## Visuals
- [ ] **Slant**: Are buttons and headers angled ~6 degrees?
- [ ] **Mobile Menu**: Does the diagonal slide-out work on screens < 768px?
- [ ] **Fonts**: Are Orbitron and Rajdhani loading?

## Dashboard Logic (Mock)
- [ ] **Auth**: Clicking "Claim" should trigger a signature request in Phantom.
- [ ] **State**: After signing, button changes to "CLAIMED".
- [ ] **Access**: Dashboard shows "ACCESS RESTRICTED" if wallet not connected.

## Routing
- [ ] Verify `/compete`, `/leaderboards`, `/showcase` load correct components.