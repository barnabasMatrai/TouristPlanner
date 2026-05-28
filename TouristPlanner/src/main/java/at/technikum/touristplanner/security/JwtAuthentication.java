package at.technikum.touristplanner.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

public class JwtAuthentication extends AbstractAuthenticationToken {

    private final String principal;
    private final String credentials;

    public JwtAuthentication(String userId, String email, List<String> roles) {
        super(roles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role)).toList());
        this.principal = userId;
        this.credentials = email;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
