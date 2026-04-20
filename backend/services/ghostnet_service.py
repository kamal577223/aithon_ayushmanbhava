from collections import defaultdict

from models.attack_log import AttackLog


class GhostNetService:
    def __init__(self):
        self.failed_logins = defaultdict(int)
        self.alerts = []

    def monitor_login(self, identifier: str, success: bool):
        if success:
            self.failed_logins[identifier] = 0
            return {"suspicious": False}
        self.failed_logins[identifier] += 1
        return self._evaluate(identifier, "repeated_failed_login")

    def monitor_api_activity(self, identifier: str, suspicious: bool):
        if not suspicious:
            return {"suspicious": False}
        return self._evaluate(identifier, "suspicious_api_activity")

    def _evaluate(self, identifier: str, attack_type: str):
        if self.failed_logins[identifier] > 5 or attack_type == "suspicious_api_activity":
            return {
                "suspicious": True,
                "decoy_deployed": self.deploy_decoy_environment(identifier),
                "alert_sent": self.send_alert(identifier, attack_type),
                "attack_type": attack_type,
            }
        return {"suspicious": False}

    def deploy_decoy_environment(self, identifier: str):
        return f"Decoy environment deployed for {identifier}"

    def log_attack(self, db, ip_address: str, attack_type: str, status: str = "detected"):
        log = AttackLog(ip_address=ip_address, attack_type=attack_type, status=status)
        db.add(log)
        db.commit()
        db.refresh(log)
        return log

    def send_alert(self, identifier: str, attack_type: str):
        alert = {"target": identifier, "attack_type": attack_type, "status": "alerted"}
        self.alerts.append(alert)
        return True


ghostnet_service = GhostNetService()
