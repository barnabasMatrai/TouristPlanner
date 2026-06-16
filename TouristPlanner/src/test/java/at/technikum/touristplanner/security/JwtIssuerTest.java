package at.technikum.touristplanner.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtIssuerTest {

    private JwtIssuer jwtIssuer;

    @BeforeEach
    void setUp() {
        JwtProperties properties = new JwtProperties();
        properties.setSecretKey("test-secret-key-for-unit-tests-only");
        properties.setExpirationDays(1);
        jwtIssuer = new JwtIssuer(properties);
    }

    @Test
    void issue_createsNonBlankToken() {
        String token = jwtIssuer.issue(1, "user@example.com", List.of("USER"));

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void verify_validatesIssuedToken() {
        String token = jwtIssuer.issue(42, "alice@example.com", List.of("USER"));

        DecodedJWT decoded = jwtIssuer.verify(token);

        assertEquals("42", decoded.getSubject());
        assertEquals("alice@example.com", decoded.getClaim("e").asString());
        assertEquals(List.of("USER"), decoded.getClaim("a").asList(String.class));
    }

    @Test
    void verify_throwsForInvalidToken() {
        assertThrows(JWTVerificationException.class, () -> jwtIssuer.verify("invalid.token.here"));
    }
}
